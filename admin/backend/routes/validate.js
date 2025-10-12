const express = require('express');
const router = express.Router();
const { validateWheel } = require('../utils/validateWheel');

/**
 * POST /api/validate-wheel
 * Validates the binary wheel configuration
 */
router.post('/validate-wheel', (req, res) => {
    try {
        const { wheelData } = req.body;

        // Check if wheelData is provided
        if (!wheelData) {
            return res.status(400).json({
                valid: false,
                reason: "Missing wheelData in request body"
            });
        }

        // Validate the wheel
        const validation = validateWheel(wheelData);

        if (validation.valid) {
            res.json({ valid: true });
        } else {
            res.status(400).json({
                valid: false,
                reason: validation.reason
            });
        }

    } catch (error) {
        console.error('Validation error:', error);
        res.status(500).json({
            valid: false,
            reason: "Internal server error during validation"
        });
    }
});

module.exports = router;
