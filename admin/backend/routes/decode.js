const express = require('express');
const router = express.Router();
const { decodeBinary } = require('../utils/decodeBinary');
const { validateWheel } = require('../utils/validateWheel');

/**
 * POST /api/decode
 * Decodes binary input using wheel mapping
 */
router.post('/decode', (req, res) => {
    try {
        const { binaryInput, wheelData } = req.body;

        // Check if required fields are provided
        if (!binaryInput) {
            return res.status(400).json({
                error: "Missing binaryInput in request body"
            });
        }

        if (!wheelData) {
            return res.status(400).json({
                error: "Missing wheelData in request body"
            });
        }

        // Validate the wheel first
        const wheelValidation = validateWheel(wheelData);
        if (!wheelValidation.valid) {
            return res.status(400).json({
                error: `Invalid wheel configuration: ${wheelValidation.reason}`
            });
        }

        // Decode the binary input
        const result = decodeBinary(binaryInput, wheelData);

        if (result.error) {
            return res.status(400).json({
                error: result.error
            });
        }

        res.json({ decoded: result.decoded });

    } catch (error) {
        console.error('Decode error:', error);
        res.status(500).json({
            error: "Internal server error during decoding"
        });
    }
});

module.exports = router;
