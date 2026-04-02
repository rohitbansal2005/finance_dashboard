const Record = require('../models/Record');

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private (Analyst, Admin)
exports.getSummary = async (req, res) => {
    try {
        const records = await Record.find();

        let totalIncome = 0;
        let totalExpense = 0;
        const categoryTotals = {};

        records.forEach(record => {
            if (record.type === 'Income') {
                totalIncome += record.amount;
            } else if (record.type === 'Expense') {
                totalExpense += record.amount;
            }

            if (!categoryTotals[record.category]) {
                categoryTotals[record.category] = 0;
            }
            categoryTotals[record.category] += record.amount;
        });

        const netBalance = totalIncome - totalExpense;

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                netBalance,
                categoryTotals,
                recentActivity: records.slice(0, 5) // Last 5 records
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
