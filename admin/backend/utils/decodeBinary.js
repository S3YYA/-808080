/**
 * Decodes binary input using wheel mapping
 * @param {string} binaryInput - Binary string to decode
 * @param {Array} wheelData - Array of 32 binary strings (5 bits each)
 * @returns {Object} - { decoded: string } or { error: string }
 */
function decodeBinary(binaryInput, wheelData) {
    // Validate inputs
    if (typeof binaryInput !== 'string') {
        return { error: "Binary input must be a string" };
    }

    if (!Array.isArray(wheelData) || wheelData.length !== 32) {
        return { error: "Wheel data must be an array of 32 elements" };
    }

    // Validate binary input contains only 0s and 1s
    if (!/^[01]*$/.test(binaryInput)) {
        return { error: "Binary input must contain only '0' and '1' characters" };
    }

    // Create wheel lookup table (pattern -> slice number)
    const wheelLookup = {};
    for (let slice = 0; slice < wheelData.length; slice++) {
        const pattern = wheelData[slice];
        
        // Check for duplicate patterns (invalid wheel)
        if (wheelLookup[pattern]) {
            return { error: "Invalid wheel: duplicate pattern found" };
        }
        
        wheelLookup[pattern] = slice;
    }

    // Split binary input into 5-bit chunks with padding
    const chunks = [];
    for (let i = 0; i < binaryInput.length; i += 5) {
        let chunk = binaryInput.slice(i, i + 5);
        
        // Pad last chunk with leading zeros if it has less than 5 bits
        if (chunk.length < 5) {
            chunk = chunk.padStart(5, '0');
        }
        
        chunks.push(chunk);
    }

    // Decode each chunk using wheel lookup
    let decoded = '';
    for (let chunk of chunks) {
        // Find matching slice in wheel
        const sliceNumber = wheelLookup[chunk];
        
        if (sliceNumber === undefined) {
            return { error: `Invalid wheel: no matching pattern found for chunk '${chunk}'` };
        }
        
        // Map slice number to character
        const character = mapDecimalToCharacter(sliceNumber);
        decoded += character;
    }

    return { decoded };
}

/**
 * Converts 5-bit binary string to decimal
 * @param {string} binary - 5-bit binary string
 * @returns {number} - Decimal value
 */
function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

/**
 * Maps decimal value to character using the specified mapping table
 * @param {number} decimal - Decimal value (0-31)
 * @returns {string} - Corresponding character
 */
function mapDecimalToCharacter(decimal) {
    // Character mapping table as specified
    const charMap = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',  // 0-9
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',  // 10-19
        'U', 'V', 'W', 'X', 'Y', 'Z', '@', '#', '_', '{',  // 20-29
        '}', '&'  // 30-31
    ];
    
    if (decimal >= 0 && decimal <= 31) {
        return charMap[decimal];
    }
    
    return '?'; // Invalid decimal value
}

/**
 * Validates that a binary string is exactly 5 bits
 * @param {string} binary - Binary string to validate
 * @returns {boolean} - True if valid 5-bit binary
 */
function isValid5BitBinary(binary) {
    return typeof binary === 'string' && /^[01]{5}$/.test(binary);
}

module.exports = {
    decodeBinary,
    binaryToDecimal,
    mapDecimalToCharacter,
    isValid5BitBinary
};
