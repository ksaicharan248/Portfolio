// Elite Portfolio - Contact API
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many contact requests from this IP, please try again later.'
    }
});

const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

// Email transporter configuration with better error handling
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER || 'your-email@gmail.com',
            pass: process.env.GMAIL_PASS || 'your-app-password'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Test email configuration on startup
const testEmailConfig = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ Email configuration verified successfully');
    } catch (error) {
        console.warn('⚠️  Email configuration issue:', error.message);
        console.warn('Please check your EMAIL_USER and EMAIL_PASS in .env file');
    }
};

// Initialize email test
testEmailConfig();

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        // Create fresh transporter for each request to handle potential auth issues
        const currentTransporter = createTransporter();
        
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Please enter a valid email address'
            });
        }

        // Input sanitization
        const sanitizedData = {
            name: name.trim().substring(0, 100),
            email: email.trim().toLowerCase().substring(0, 100),
            subject: subject.trim().substring(0, 200),
            message: message.trim().substring(0, 1000)
        };

        // Email to portfolio owner
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'saicharanreddy141458@gmail.com',
            subject: `Portfolio Contact: ${sanitizedData.subject}`,
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">New Portfolio Contact</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                            
                            <div style="margin-bottom: 20px;">
                                <strong style="color: #555;">Name:</strong>
                                <span style="margin-left: 10px; color: #333;">${sanitizedData.name}</span>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <strong style="color: #555;">Email:</strong>
                                <span style="margin-left: 10px; color: #333;">
                                    <a href="mailto:${sanitizedData.email}" style="color: #667eea; text-decoration: none;">${sanitizedData.email}</a>
                                </span>
                            </div>
                            
                            <div style="margin-bottom: 25px;">
                                <strong style="color: #555;">Subject:</strong>
                                <span style="margin-left: 10px; color: #333;">${sanitizedData.subject}</span>
                            </div>
                            
                            <div style="border-top: 1px solid #e9ecef; padding-top: 20px;">
                                <strong style="color: #555; display: block; margin-bottom: 10px;">Message:</strong>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
                                    ${sanitizedData.message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px; color: #666;">
                            <p style="margin: 0; font-size: 14px;">
                                This message was sent from your Elite Portfolio contact form.
                            </p>
                            <p style="margin: 5px 0 0 0; font-size: 12px;">
                                Time: ${new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            `,
            replyTo: sanitizedData.email
        };

        // Auto-reply to sender
        const autoReplyOptions = {
            from: process.env.GMAIL_USER,
            to: sanitizedData.email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <p style="font-size: 18px; color: #333; margin-top: 0;">Hi ${sanitizedData.name},</p>
                            
                            <p style="color: #666; line-height: 1.8;">
                                Thank you for reaching out through my portfolio! I've received your message about 
                                "<strong style="color: #667eea;">${sanitizedData.subject}</strong>" and I'll get back to you as soon as possible.
                            </p>
                            
                            <p style="color: #666; line-height: 1.8;">
                                I appreciate your interest and will respond within 24 hours. In the meantime, feel free to 
                                explore my portfolio and check out my latest projects.
                            </p>
                            
                            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 25px 0;">
                                <p style="margin: 0; color: #555; font-style: italic;">
                                    "Innovation distinguishes between a leader and a follower." - Steve Jobs
                                </p>
                            </div>
                            
                            <p style="color: #666; margin-bottom: 0;">
                                Best regards,<br>
                                <strong style="color: #667eea;">Sai Charan K</strong><br>
                                <span style="color: #999; font-size: 14px;">Software Developer & Tech Enthusiast</span>
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                            <p style="margin: 0;">This is an automated response from my portfolio contact system.</p>
                        </div>
                    </div>
                </div>
            `
        };

        // Send emails
        await currentTransporter.sendMail(mailOptions);
        await currentTransporter.sendMail(autoReplyOptions);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        
        res.status(500).json({
            error: 'Failed to send message',
            message: 'Please try again later or contact me directly via email.'
        });
    }
});

module.exports = app;
