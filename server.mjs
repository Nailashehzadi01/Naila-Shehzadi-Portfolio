import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(__dirname));

// Handle all routes - serve index.html for any route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Portfolio website running at http://0.0.0.0:${PORT}`);
    console.log('📁 Serving static files:');
    console.log('   • indexxxxx.html - Main portfolio page');
    console.log('   • stylessss.css - Complete styling');
    console.log('   • javaaascript.js - All JavaScript functionality');
    console.log('🚀 Your portfolio is ready to view!');
});