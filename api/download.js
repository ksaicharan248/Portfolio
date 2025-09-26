// Elite Portfolio - Resume Download API
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Resume download endpoint
app.get('/api/download', (req, res) => {
    try {
        // Path to resume file (you'll need to add your actual resume file)
        const resumePath = path.join(__dirname, '../assets/Sai_Charan_K_Resume.pdf');
        
        // Check if file exists
        if (!fs.existsSync(resumePath)) {
            return res.status(404).json({
                error: 'Resume file not found'
            });
        }

        // Set headers for download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Sai_Charan_K_Resume.pdf"');
        
        // Send file
        res.sendFile(resumePath);
        
        // Log download (optional)
        console.log(`Resume downloaded at ${new Date().toISOString()}`);
        
    } catch (error) {
        console.error('Resume download error:', error);
        res.status(500).json({
            error: 'Failed to download resume'
        });
    }
});

// Resume preview endpoint
app.get('/api/resume-preview', (req, res) => {
    try {
        const resumePath = path.join(__dirname, '../assets/Sai_Charan_K_Resume.pdf');
        
        if (!fs.existsSync(resumePath)) {
            return res.status(404).json({
                error: 'Resume file not found'
            });
        }

        // Set headers for inline display
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="Sai_Charan_K_Resume.pdf"');
        
        res.sendFile(resumePath);
        
    } catch (error) {
        console.error('Resume preview error:', error);
        res.status(500).json({
            error: 'Failed to preview resume'
        });
    }
});

module.exports = app;
