import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: true, // Allow all origins in development, configure for production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        // Allow images and PDFs
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files (JPEG, PNG, GIF) and PDF files are allowed!'));
        }
    }
});

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

// Validation rules for contact form (will be applied after multer processes the form)
const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email address'),
    body('phone').optional({ checkFalsy: true }).trim(),
    body('inquiry').notEmpty().withMessage('Please select an inquiry type'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

// Error handler for multer
const handleMulterError = (err, req, res, next) => {
    if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message || 'File upload error occurred.'
        });
    }
    next();
};

// Contact Form API Endpoint with file upload support
app.post('/api/contact', upload.single('designFile'), handleMulterError, contactValidation, async (req, res) => {
    console.log('📧 Contact form submission received:', {
        timestamp: new Date().toISOString(),
        origin: req.get('origin'),
        userAgent: req.get('user-agent'),
        hasFile: !!req.file
    });
    
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Clean up uploaded file if validation fails
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, phone, inquiry, message } = req.body;

        // Prepare email attachments if file was uploaded
        const attachments = [];
        if (req.file) {
            attachments.push({
                filename: req.file.originalname,
                path: req.file.path
            });
        }

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
                        ${req.file ? `<p><strong>Design File:</strong> ${req.file.originalname} (attached)</p>` : ''}
                    </div>
                    <p style="color: #666; font-size: 12px;">This email was sent from the REBELWEAR contact form.</p>
                </div>
            `,
            attachments: attachments
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

        // Clean up uploaded file after sending email (optional - you might want to keep it)
        // Uncomment the following lines if you want to delete files after sending
        // if (req.file) {
        //     setTimeout(() => {
        //         fs.unlinkSync(req.file.path);
        //     }, 60000); // Delete after 1 minute
        // }

    } catch (error) {
        console.error('Error processing contact form:', error);
        
        // Clean up uploaded file on error
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }
        
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending your inquiry. Please try again later or contact us directly.'
        });
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

