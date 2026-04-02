const express = require('express');
const {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
} = require('../controllers/recordController');

const { protect, authorize } = require('../middlewares/auth');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validate');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(authorize('Analyst', 'Admin'), getRecords)
    .post(
        authorize('Admin'),
        [
            body('amount', 'Amount is required and must be numeric').isNumeric(),
            body('type', 'Type must be Income or Expense').isIn(['Income', 'Expense']),
            body('category', 'Category is required').notEmpty()
        ],
        validate,
        createRecord
    );

router.route('/:id')
    .get(authorize('Analyst', 'Admin'), getRecord)
    .put(authorize('Admin'), updateRecord)
    .delete(authorize('Admin'), deleteRecord);

module.exports = router;
