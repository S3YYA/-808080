/**
 * Validates a binary wheel configuration
 * @param {Array} wheelData - Array of 32 binary strings (5 bits each)
 * @returns {Object} - { valid: boolean, reason?: string }
 */
function validateWheel(wheelData) {
    // Check if wheelData is an array
    if (!Array.isArray(wheelData)) {
        return { valid: false, reason: "Wheel data must be an array" };
    }

    // Check if array has exactly 32 elements
    if (wheelData.length !== 32) {
        return { valid: false, reason: "Wheel must have exactly 32 elements" };
    }

    // Check each element is a valid 5-bit binary string
    for (let i = 0; i < wheelData.length; i++) {
        const element = wheelData[i];
        
        if (typeof element !== 'string') {
            return { valid: false, reason: `Element ${i} must be a string` };
        }
        
        if (element.length !== 5) {
            return { valid: false, reason: `Element ${i} must be exactly 5 bits long` };
        }
        
        if (!/^[01]{5}$/.test(element)) {
            return { valid: false, reason: `Element ${i} must contain only '0' and '1' characters` };
        }
    }

    // Check uniqueness of all elements
    const uniqueElements = new Set(wheelData);
    if (uniqueElements.size !== 32) {
        return { valid: false, reason: "All wheel elements must be unique" };
    }

    // Check Hamming distance between adjacent elements
    for (let i = 0; i < 32; i++) {
        const current = wheelData[i];
        const next = wheelData[(i + 1) % 32];
        
        const hammingDistance = calculateHammingDistance(current, next);
        if (hammingDistance !== 1) {
            return { 
                valid: false, 
                reason: `Adjacent elements ${i} and ${(i + 1) % 32} differ by ${hammingDistance} bits (must be exactly 1)` 
            };
        }
    }

    return { valid: true };
}

/**
 * Calculates Hamming distance between two binary strings
 * @param {string} str1 - First binary string
 * @param {string} str2 - Second binary string
 * @returns {number} - Number of differing bits
 */
function calculateHammingDistance(str1, str2) {
    if (str1.length !== str2.length) {
        throw new Error("Strings must be of equal length");
    }
    
    let distance = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            distance++;
        }
    }
    
    return distance;
}

module.exports = {
    validateWheel,
    calculateHammingDistance
};
