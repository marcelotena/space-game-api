const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .post(createUser);

module.exports = router;