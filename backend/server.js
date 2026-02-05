import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images (JPEG, JPG, PNG) and PDF files are allowed'));
        }
    }
});

// Middleware
app.use(cors({
    origin: true, // Allow all origins in development, configure for production
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional - if you want to serve the frontend from here)
app.use(express.static('.'));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to other services (outlook, yahoo, etc.)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Validation rules for contact form
const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email address'),
    body('phone').optional().trim(),
    body('inquiry').notEmpty().withMessage('Please select an inquiry type'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

// Contact Form API Endpoint
app.post('/api/contact', upload.single('designFile'), async (req, res) => {
    console.log('📧 Contact form submission received:', {
        timestamp: new Date().toISOString(),
        body: req.body,
        file: req.file ? req.file.originalname : 'No file'
    });
    
    try {
        const { name, email, phone, inquiry, message } = req.body;

        // Manual validation
        if (!name || name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name is required and must be at least 2 characters'
            });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        if (!inquiry) {
            return res.status(400).json({
                success: false,
                message: 'Please select an inquiry type'
            });
        }

        if (!message || message.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Message is required and must be at least 10 characters'
            });
        }
        const uploadedFile = req.file;

        // Email content for the business owner
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            subject: `New Inquiry: ${inquiry} - REBELWEAR`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff3d00;">New Contact Form Inquiry</h2>
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                        <p><strong>Inquiry Type:</strong> ${inquiry}</p>
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message.replace(/\n/g, '<br>')}</p>
                        ${uploadedFile ? `<p><strong>Design File:</strong> ${uploadedFile.originalname}</p>` : ''}
                    </div>
                    <p style="color: #666; font-size: 12px;">This email was sent from the REBELWEAR contact form.</p>
                </div>
            `,
            attachments: uploadedFile ? [{
                filename: uploadedFile.originalname,
                path: uploadedFile.path
            }] : []
        };

        // Confirmation email for the customer
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting REBELWEAR',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff3d00;">Thank you for contacting REBELWEAR!</h2>
                    <p>Dear ${name},</p>
                    <p>We have received your inquiry regarding <strong>${inquiry}</strong> and will get back to you within 24-48 working hours.</p>
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Your Message:</strong></p>
                        <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message.replace(/\n/g, '<br>')}</p>
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
            `
        };

        // Send emails with error handling
        try {
            await transporter.sendMail(mailOptions);
            console.log('✅ Business notification email sent');
        } catch (emailError) {
            console.error('❌ Failed to send business email:', emailError.message);
        }
        
        try {
            await transporter.sendMail(confirmationMailOptions);
            console.log('✅ Customer confirmation email sent');
        } catch (emailError) {
            console.error('❌ Failed to send confirmation email:', emailError.message);
        }

        res.json({
            success: true,
            message: 'Your inquiry has been sent successfully! We will get back to you within 24-48 hours.'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending your inquiry. Please try again later or contact us directly.'
        });
    }
});

// Order API Endpoint
app.post('/api/order', async (req, res) => {
    console.log('📦 Order submission received:', {
        timestamp: new Date().toISOString(),
        body: req.body
    })
    
    try {
        const { productName, productImage, size, quantity, price, customerName, email, phone, address } = req.body

        // Validation
        if (!productName || !size || !quantity || !customerName || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            })
        }

        const totalPrice = (parseFloat(price) * parseInt(quantity)).toFixed(2)
        
        // Get image path for attachment
        const imagePath = productImage.startsWith('/') 
            ? path.join(__dirname, productImage.substring(1))
            : path.join(__dirname, productImage)

        // Email to business owner
        const orderMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            subject: `New Order: ${productName} - REBELWEAR`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff3d00;">New Product Order</h2>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="cid:productImage" alt="${productName}" style="max-width: 300px; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
                    </div>
                    
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
                        <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${address.replace(/\n/g, '<br>')}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">This email was sent from the REBELWEAR order system.</p>
                </div>
            `,
            attachments: [{
                filename: `${productName.replace(/\s+/g, '_')}.jpg`,
                path: imagePath,
                cid: 'productImage'
            }]
        }

        // Confirmation email to customer
        const customerOrderConfirmation = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Order Confirmation - REBELWEAR',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ff3d00;">Order Confirmation</h2>
                    <p>Dear ${customerName},</p>
                    <p>Thank you for your order! We have received your order and will process it within 24-48 hours.</p>
                    
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3>Order Summary:</h3>
                        <p><strong>Product:</strong> ${productName}</p>
                        <p><strong>Size:</strong> ${size}</p>
                        <p><strong>Quantity:</strong> ${quantity}</p>
                        <p><strong>Total:</strong> $${totalPrice}</p>
                        
                        <h3>Shipping Address:</h3>
                        <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${address.replace(/\n/g, '<br>')}</p>
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
            `
        }

        // Send emails
        try {
            await transporter.sendMail(orderMailOptions)
            console.log('✅ Order notification email sent')
        } catch (emailError) {
            console.error('❌ Failed to send order email:', emailError.message)
        }
        
        try {
            await transporter.sendMail(customerOrderConfirmation)
            console.log('✅ Customer order confirmation sent')
        } catch (emailError) {
            console.error('❌ Failed to send customer confirmation:', emailError.message)
        }

        res.json({
            success: true,
            message: 'Order placed successfully! We will contact you within 24-48 hours with payment and shipping details.'
        })

    } catch (error) {
        console.error('Error processing order:', error)
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your order. Please try again later.'
        })
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'REBELWEAR API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is working correctly',
        timestamp: new Date().toISOString(),
        headers: req.headers
    });
});

// Simple contact test without email
app.post('/api/contact-test', (req, res) => {
    console.log('📧 Test contact submission:', req.body);
    res.json({
        success: true,
        message: 'Test submission received successfully',
        data: req.body
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 REBELWEAR Backend Server running on port ${PORT}`);
    console.log(`📧 Email service configured: ${process.env.EMAIL_USER ? 'Ready' : 'Not configured'}`);
});

