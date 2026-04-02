const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: [true, 'Type must be Income or Expense']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot be more than 500 characters']
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
