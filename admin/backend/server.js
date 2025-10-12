const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import route modules
const validateRoutes = require('./routes/validate');
const decodeRoutes = require('./routes/decode');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Serve static files from frontend directory
app.use(express.static('../frontend'));

// Routes
app.use('/api', validateRoutes);
app.use('/api', decodeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'CTF Challenge Backend API'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
            'POST /api/validate-wheel',
            'POST /api/decode',
            'GET /health'
        ]
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 CTF Challenge Backend API running on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log(`🔧 Available endpoints:`);
    console.log(`   POST /api/validate-wheel`);
    console.log(`   POST /api/decode`);
});
