const express = require('express');
const {
    getUsers,
    getUser,
    updateUserRoleStatus,
    deleteUser
} = require('../controllers/userController');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// All routes here are protected and require Admin role
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
    .get(getUsers);

router.route('/:id')
    .get(getUser)
    .delete(deleteUser);

router.put('/:id/role', updateUserRoleStatus);

module.exports = router;
