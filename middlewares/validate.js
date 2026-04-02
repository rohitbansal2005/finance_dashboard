const { validationResult } = require('express-validator');

// Middleware to format express-validator errors
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Extract messages and join them or return array
        const extractedErrors = errors.array().map(err => err.msg);
        return res.status(400).json({
            success: false,
            error: extractedErrors.join(', ')
        });
    }
    next();
};
