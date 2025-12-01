const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
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
    body('phone').optional().trim().isMobilePhone().withMessage('Please provide a valid phone number'),
    body('inquiry').notEmpty().withMessage('Please select an inquiry type'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

// Contact Form API Endpoint
app.post('/api/contact', contactValidation, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, phone, inquiry, message } = req.body;

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
                    </div>
                    <p style="color: #666; font-size: 12px;">This email was sent from the REBELWEAR contact form.</p>
                </div>
            `
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

        // Send emails
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(confirmationMailOptions);

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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'REBELWEAR API is running',
        timestamp: new Date().toISOString()
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

