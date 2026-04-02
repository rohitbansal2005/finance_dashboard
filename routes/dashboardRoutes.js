const express = require('express');
const { getSummary } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.get('/summary', authorize('Analyst', 'Admin'), getSummary);

module.exports = router;
