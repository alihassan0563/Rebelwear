import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import os from "os";
import { Resend } from "resend";
import cloudinary from "./config/cloudinary.js";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { saveOrder } from "./services/storageService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

console.log("🔍 ENV CHECK:", {
  user: process.env.EMAIL_USER,
  passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
  passFirst4: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 4) : "MISSING"
});

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads using memoryStorage for seamless serverless execution
const uploadContact = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedExts = /\.(jpe?g|png|webp|avif|svg|pdf|heic|jfif|gif|bmp|tiff|ai|eps|psd|zip)$/i;
    const ext = path.extname(file.originalname || "").toLowerCase();
    const hasValidExt = allowedExts.test(ext);

    const isImageMime = file.mimetype && file.mimetype.startsWith("image/");
    const isDocMime =
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/x-pdf" ||
      file.mimetype === "application/postscript" ||
      file.mimetype === "image/vnd.adobe.photoshop" ||
      file.mimetype === "application/zip" ||
      file.mimetype === "application/x-zip-compressed" ||
      file.mimetype === "application/octet-stream";

    if (hasValidExt || isImageMime || isDocMime) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          `File type "${ext || file.mimetype}" is not supported. Please upload an image (JPG, PNG, WEBP, SVG), PDF, or design file (AI, EPS, PSD, ZIP).`
        )
      );
    }
  },
});

// Middleware to catch Multer errors gracefully and return 400 instead of cascading to 500
const handleContactUpload = (req, res, next) => {
  uploadContact.single("designFile")(req, res, (err) => {
    if (err) {
      console.warn("⚠️ Contact file upload error:", err.message);
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File is too large. Maximum allowed size is 5MB.",
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "Invalid file uploaded.",
      });
    }
    next();
  });
};

// Allowed CORS origins including Netlify production and local dev
const allowedOrigins = [
  "https://rebelwearstore.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5173",
];

if (process.env.FRONTEND_URL) {
  const customFrontend = process.env.FRONTEND_URL.replace(/\/$/, "");
  if (!allowedOrigins.includes(customFrontend)) {
    allowedOrigins.push(customFrontend);
  }
}

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, server-to-server, curl)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".netlify.app")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure database connection is active for serverless request execution
app.use(async (req, res, next) => {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
    } catch (err) {
      console.error("Database connection check failed:", err.message);
    }
  }
  next();
});

// Trust proxy for secure cookies / protocol detection behind reverse proxies
app.set("trust proxy", 1);

// Configure Nodemail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
});

// Helper to ensure a valid business recipient email address is always resolved
const getBusinessEmail = () => {
  const contact = (process.env.CONTACT_EMAIL || "").trim();
  if (contact && contact.includes("@")) {
    return contact;
  }
  return process.env.EMAIL_USER || "rebelwear40@gmail.com";
};

// Validation rules for contact form
const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("phone").optional().trim(),
  body("inquiry").notEmpty().withMessage("Please select an inquiry type"),
  body("message") // this is not a valid syntasx
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters"),
];

// Contact Form API Endpoint
app.post("/api/contact", handleContactUpload, async (req, res) => {
  console.log("📧 Contact form submission received:", {
    timestamp: new Date().toISOString(),
    body: req.body,
    file: req.file
      ? `${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)`
      : "No file",
    envCheck: {
      emailUser: process.env.EMAIL_USER ? "Set" : "Missing",
      emailPass: process.env.EMAIL_PASS ? "Set" : "Missing",
      contactEmail: process.env.CONTACT_EMAIL ? "Set" : "Missing",
    },
  });

  try {
    const { name, email, phone, inquiry, message } = req.body;

    // Manual validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name is required and must be at least 2 characters",
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!inquiry) {
      return res.status(400).json({
        success: false,
        message: "Please select an inquiry type",
      });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be at least 10 characters",
      });
    }

    const uploadedFile = req.file;
    const isImage =
      uploadedFile &&
      uploadedFile.mimetype &&
      uploadedFile.mimetype.startsWith("image/") &&
      !uploadedFile.mimetype.includes("svg");

    // Email content for the business owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: getBusinessEmail(),
      subject: `New Inquiry: ${inquiry} - REBELWEAR`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #ff3d00;">New Contact Form Inquiry</h2>
            ${
              uploadedFile
                ? isImage
                  ? `
            <div style="text-align: center; margin: 20px 0;">
                <img src="cid:designImage" alt="${uploadedFile.originalname}" style="max-width: 400px; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
                <p style="color: #666; font-size: 12px; margin-top: 10px;">Design File: ${uploadedFile.originalname} (${(uploadedFile.size / 1024).toFixed(1)} KB)</p>
            </div>
            `
                  : `
            <div style="background: #f1f5f9; border: 1px dashed #94a3b8; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1e293b;">📎 Attached Design File</p>
                <p style="margin: 5px 0 0; color: #64748b; font-size: 12px;">${uploadedFile.originalname} (${(uploadedFile.size / 1024).toFixed(1)} KB) - Please see email attachment.</p>
            </div>
            `
                : ""
            }
            <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Inquiry Type:</strong> ${inquiry}</p>
                <p><strong>Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="color: #666; font-size: 12px;">This email was sent from the REBELWEAR contact form.</p>
        </div>
      `,
      attachments: uploadedFile
        ? [
            {
              filename: uploadedFile.originalname,
              content: uploadedFile.buffer,
              contentType: uploadedFile.mimetype,
              ...(isImage ? { cid: "designImage" } : {}),
            },
          ]
        : [],
    };

    // Confirmation email for the customer
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting REBELWEAR",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #ff3d00;">Thank you for contacting REBELWEAR!</h2>
            <p>Dear ${name},</p>
            <p>We have received your inquiry regarding <strong>${inquiry}</strong> and will get back to you within 24-48 working hours.</p>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Your Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p>If you have any urgent questions, feel free to contact us directly at:</p>
            <ul>
                <li>Email: <a href="mailto:rebelwear40@gmail.com">rebelwear40@gmail.com</a></li>
                <li>Phone: <a href="tel:+923313337574">+92 3313337574</a></li>
            </ul>
            <p style="margin-top: 30px;">Best regards,<br><strong>The REBELWEAR Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">This is an automated confirmation email. Please do not reply to this message.</p>
        </div>
      `,
    };

    // Send business notification email first
    let businessSent = false;
    try {
      await transporter.sendMail(mailOptions);
      businessSent = true;
      console.log("✅ Business notification email sent via SMTP");
    } catch (emailError) {
      console.error(
        "❌ Failed to send business email via SMTP:",
        emailError.message
      );
      // Attempt Resend fallback if available
      if (process.env.RESEND_API_KEY) {
        try {
          const resendPayload = {
            from: "REBELWEAR <onboarding@resend.dev>",
            to: [getBusinessEmail()],
            subject: `New Inquiry: ${inquiry} - REBELWEAR`,
            html: mailOptions.html,
          };
          if (uploadedFile) {
            resendPayload.attachments = [
              {
                filename: uploadedFile.originalname,
                content: uploadedFile.buffer.toString("base64"),
              },
            ];
          }
          await resend.emails.send(resendPayload);
          businessSent = true;
          console.log("✅ Business email sent via Resend fallback");
        } catch (resendError) {
          console.error("❌ Resend fallback also failed:", resendError.message);
        }
      }
    }

    if (!businessSent) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to send your inquiry. Please try again or contact us directly at rebelwear40@gmail.com or +92 3313337574.",
      });
    }

    // Customer confirmation email (non-blocking)
    try {
      await transporter.sendMail(confirmationMailOptions);
      console.log("✅ Customer confirmation email sent");
    } catch (emailError) {
      console.warn("⚠️ Customer confirmation email notice:", emailError.message);
    }

    return res.json({
      success: true,
      message:
        "Your inquiry has been sent successfully! We will get back to you within 24-48 hours.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while sending your inquiry. Please try again later or contact us directly.",
    });
  }
});

// Order API Endpoint
app.post("/api/order", async (req, res) => {
  console.log("📦 Order submission received:", {
    timestamp: new Date().toISOString(),
    body: req.body,
  });

  try {
    const {
      productName,
      productImage,
      size,
      quantity,
      price,
      customerName,
      email,
      phone,
      address,
    } = req.body;

    // Validation
    if (
      !productName ||
      !size ||
      !quantity ||
      !customerName ||
      !email ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const totalPrice = (parseFloat(price) * parseInt(quantity)).toFixed(2);

    console.log("🖼️ Processing product image:", productImage);

    // Embed the product image as a real hosted URL so it renders reliably in
    // email (both Nodemailer and Resend). Product catalog images are now
    // Cloudinary URLs already (see backend/scripts/upload-frontend-images-to-cloudinary.mjs),
    // so most orders just reuse that URL directly. Anything else (a relative
    // frontend path from an older cached page, or a foreign URL) still gets
    // uploaded to Cloudinary to normalize it into a real hosted URL.
    let imageUrl = null;
    let imageHtml = "";

    if (productImage) {
      try {
        if (productImage.includes("res.cloudinary.com")) {
          imageUrl = productImage;
        } else {
          const frontendUrl = (
            process.env.FRONTEND_URL || "https://rebelwearstore.netlify.app"
          ).replace(/\/$/, "");
          const absoluteImageUrl = productImage.startsWith("http")
            ? productImage
            : encodeURI(`${frontendUrl}/${productImage.replace(/^\//, "")}`);

          console.log("📥 Uploading product image to Cloudinary:", absoluteImageUrl);

          const uploadResult = await cloudinary.uploader.upload(absoluteImageUrl, {
            folder: "rebelwear/orders",
          });

          imageUrl = uploadResult.secure_url;
        }

        imageHtml = `
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="${imageUrl}" alt="${productName}" style="max-width: 300px; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
                    </div>
                    `;
        console.log("✅ Product image ready:", imageUrl);
      } catch (imageError) {
        console.error("❌ Error resolving product image:", imageError.message);
        // Continue without image if there's an error
      }
    } else {
      console.log("⚠️ No product image provided");
    }

    // Email to business owner
    const orderMailOptions = {
      from: process.env.EMAIL_USER,
      to: getBusinessEmail(),
      subject: `New Order: ${productName} - REBELWEAR`,
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff3d00;">New Product Order</h2>
                    
                    ${imageHtml}
                    
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Order Summary:</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px 0; font-weight: bold;">Product:</td>
                                <td style="padding: 8px 0;">${productName}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px 0; font-weight: bold;">Size:</td>
                                <td style="padding: 8px 0;">${size}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px 0; font-weight: bold;">Quantity:</td>
                                <td style="padding: 8px 0;">${quantity}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px 0; font-weight: bold;">Unit Price:</td>
                                <td style="padding: 8px 0;">$${price}</td>
                            </tr>
                            <tr style="border-bottom: 2px solid #ff3d00;">
                                <td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total:</td>
                                <td style="padding: 12px 0; font-weight: bold; font-size: 18px; color: #ff3d00;">$${totalPrice}</td>
                            </tr>
                        </table>
                        
                        <h3 style="color: #333; margin-top: 20px;">Customer Information:</h3>
                        <p><strong>Name:</strong> ${customerName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Address:</strong></p>
                        <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${address.replace(/\n/g, "<br>")}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">This email was sent from the REBELWEAR order system.</p>
                </div>
            `,
    };

    // Confirmation email to customer
    const customerOrderConfirmation = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation - REBELWEAR",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff3d00;">Order Confirmation</h2>
                    <p>Dear ${customerName},</p>
                    <p>Thank you for your order! We have received your order and will process it within 24-48 hours.</p>
                    
                    ${imageHtml}
                    
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3>Order Summary:</h3>
                        <p><strong>Product:</strong> ${productName}</p>
                        <p><strong>Size:</strong> ${size}</p>
                        <p><strong>Quantity:</strong> ${quantity}</p>
                        <p><strong>Total:</strong> $${totalPrice}</p>
                        
                        <h3>Shipping Address:</h3>
                        <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${address.replace(/\n/g, "<br>")}</p>
                    </div>
                    
                    <p>We will contact you at ${phone} or ${email} with shipping details and payment instructions.</p>
                    
                    <p>If you have any questions, feel free to contact us:</p>
                    <ul>
                        <li>Email: <a href="mailto:rebelwear40@gmail.com">rebelwear40@gmail.com</a></li>
                        <li>Phone: <a href="tel:+923313337574">+92 3313337574</a></li>
                    </ul>
                    
                    <p style="margin-top: 30px;">Best regards,<br><strong>The REBELWEAR Team</strong></p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">This is an automated confirmation email.</p>
                </div>
            `,
    };

    // Persist order in database
    let savedOrder = null;
    try {
      savedOrder = await saveOrder({
        productName,
        productImage: imageUrl || productImage || "",
        size,
        quantity: parseInt(quantity, 10) || 1,
        price,
        totalPrice,
        customerName,
        email,
        phone,
        address,
        status: "pending",
      });
      console.log("💾 Order saved to storage:", savedOrder._id || savedOrder.id);
    } catch (saveError) {
      console.error("⚠️ Failed to persist order record:", saveError.message);
    }

    // Send both business notification and customer confirmation via Nodemailer
    // In serverless environments (like Vercel), we MUST await promises BEFORE res.json(),
    // otherwise the serverless runtime freezes/terminates immediately and emails are never sent.
    let emailStatus = {
      businessNotification: false,
      customerConfirmation: false,
    };

    try {
      const [businessResult, customerResult] = await Promise.allSettled([
        transporter.sendMail(orderMailOptions),
        transporter.sendMail(customerOrderConfirmation),
      ]);

      if (businessResult.status === "fulfilled") {
        console.log(
          "✅ Order notification email sent to store owner:",
          businessResult.value.messageId,
        );
        emailStatus.businessNotification = true;
      } else {
        console.error(
          "❌ Failed to send order email to store owner:",
          businessResult.reason?.message || businessResult.reason,
        );
      }

      if (customerResult.status === "fulfilled") {
        console.log(
          "✅ Customer order confirmation sent to:",
          email,
          customerResult.value.messageId,
        );
        emailStatus.customerConfirmation = true;
      } else {
        console.error(
          "❌ Failed to send customer confirmation email:",
          customerResult.reason?.message || customerResult.reason,
        );
      }
    } catch (emailError) {
      console.error(
        "⚠️ Error while dispatching order emails:",
        emailError.message,
      );
    }

    // Respond to client after emails are dispatched
    res.json({
      success: true,
      message:
        "Order placed successfully! We will contact you within 24-48 hours with payment and shipping details.",
      order: savedOrder,
      emailsSent: emailStatus,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your order. Please try again later.",
    });
  }
});

// Admin and Public API routes
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);
app.get("/sitemap.xml", (req, res) => res.redirect(301, "/api/sitemap.xml"));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "REBELWEAR API Server",
    status: "Running",
    endpoints: [
      "POST /api/contact",
      "POST /api/order",
      "GET /api/products",
      "GET /api/categories",
      "POST /api/admin/login",
      "GET /api/admin/orders",
      "GET /api/admin/products",
      "GET /api/admin/categories",
      "GET /api/admin/stats",
      "GET /api/health",
      "GET /api/test",
    ],
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "REBELWEAR API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    emailConfigured: {
      user: process.env.EMAIL_USER ? "✅ Set" : "❌ Missing",
      pass: process.env.EMAIL_PASS ? "✅ Set" : "❌ Missing",
      contact: process.env.CONTACT_EMAIL ? "✅ Set" : "❌ Missing",
    },
  });
});

// Test endpoint for debugging
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working correctly",
    timestamp: new Date().toISOString(),
    headers: req.headers,
  });
});

// Simple contact test without email
app.post("/api/contact-test", (req, res) => {
  console.log("📧 Test contact submission:", req.body);
  res.json({
    success: true,
    message: "Test submission received successfully",
    data: req.body,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Unhandled server error:", err);
  const statusCode =
    err.status ||
    err.statusCode ||
    (err instanceof multer.MulterError ? 400 : 500);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong! Please try again.",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server locally (bypassed in Vercel serverless environment)
if (!process.env.VERCEL) {
  app
    .listen(PORT, async () => {
      console.log(`🚀 REBELWEAR Backend Server running on port ${PORT}`);
      await connectDB();
      console.log(
        `📧 Email service configured: ${process.env.EMAIL_USER ? "Ready" : "Not configured"}`,
      );
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`✅ Server is ready to accept requests`);
    })
    .on("error", (err) => {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    });
}

export default app;
