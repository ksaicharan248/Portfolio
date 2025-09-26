// Elite Portfolio Server
require('dotenv').config();

const express = require('express');
const path = require('path');
const contactAPI = require('./api/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Mount API routes
app.use(contactAPI);

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: 'The requested endpoint does not exist.'
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong on our end.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Elite Portfolio Server running on port ${PORT}`);
    console.log(`📧 Contact API available at http://localhost:${PORT}/api/contact`);
    console.log(`🌐 Portfolio available at http://localhost:${PORT}`);
});

module.exports = app;
