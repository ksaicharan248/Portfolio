// Elite Dark Portfolio - Main Server
require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Import API routes
const contactAPI = require('./api/contact');
const downloadAPI = require('./api/download');

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (before static files)
app.use('/', contactAPI);
app.use('/', downloadAPI);

// Serve built React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // Handle React Router
    app.get('*', (req, res) => {
        // Skip API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API endpoint not found' });
        }
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
} else {
    // Development mode - serve static files from root
    app.use(express.static(path.join(__dirname)));
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'Elite Portfolio is running!',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        features: [
            'Dark/Light Theme',
            'Particle Animation',
            'Custom Cursor',
            'Smooth Scrolling',
            'Responsive Design',
            'Contact Form',
            'Resume Download',
            'SEO Optimized'
        ]
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Page not found',
        message: 'The requested resource does not exist.',
        availableEndpoints: [
            'GET / - Main portfolio',
            'GET /health - Health check',
            'POST /api/contact - Contact form',
            'GET /api/download - Resume download'
        ]
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong on our end.'
    });
});

// Server configuration
const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    🚀 Elite Dark Portfolio Server Started!
    
    📊 Server Info:
    ├── Port: ${PORT}
    ├── Environment: ${process.env.NODE_ENV || 'development'}
    ├── Node Version: ${process.version}
    └── Time: ${new Date().toISOString()}
    
    🌐 Available at:
    ├── Local: http://localhost:${PORT}
    └── Network: http://0.0.0.0:${PORT}
    
    📁 Features:
    ├── ✅ Dark/Light Theme Toggle
    ├── ✅ Particle Background Animation
    ├── ✅ Custom Cursor Effects
    ├── ✅ Smooth Scroll Navigation
    ├── ✅ Typing Animation
    ├── ✅ Count Up Statistics
    ├── ✅ Skill Progress Bars
    ├── ✅ Interactive Project Cards
    ├── ✅ Contact Form with Email
    ├── ✅ Resume Download
    ├── ✅ Mobile Responsive
    ├── ✅ Loading Screen
    └── ✅ SEO Optimized
    
    🎨 Design Highlights:
    ├── Modern Dark Theme
    ├── Gradient Accents
    ├── Glassmorphism Effects
    ├── Advanced Animations
    ├── Clean Typography
    └── Professional Layout
    `);
});

module.exports = app;
