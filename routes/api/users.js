const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/users');

const router = express.Router();

router.route('/')
    .post(createUser);

module.exports = router;