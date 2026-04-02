const Record = require('../models/Record');

// @desc    Get all records (with filtering & pagination)
// @route   GET /api/records
// @access  Private (Analyst, Admin)
exports.getRecords = async (req, res) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude from normal matching
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Support GT/GTE/LT/LTE
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        query = Record.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-date');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Record.countDocuments(JSON.parse(queryStr));

        query = query.skip(startIndex).limit(limit);

        const records = await query;
        
        // Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        res.status(200).json({
            success: true,
            count: records.length,
            pagination,
            data: records
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// @desc    Get single record
// @route   GET /api/records/:id
// @access  Private (Analyst, Admin)
exports.getRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }
        res.status(200).json({ success: true, data: record });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// @desc    Create a record
// @route   POST /api/records
// @access  Private (Admin)
exports.createRecord = async (req, res) => {
    try {
        // Add createdBy
        req.body.createdBy = req.user.id;

        const record = await Record.create(req.body);
        res.status(201).json({ success: true, data: record });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Update a record
// @route   PUT /api/records/:id
// @access  Private (Admin)
exports.updateRecord = async (req, res) => {
    try {
        let record = await Record.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }

        record = await Record.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: record });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// @desc    Delete a record
// @route   DELETE /api/records/:id
// @access  Private (Admin)
exports.deleteRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
