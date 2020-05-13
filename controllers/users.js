const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const gravatar = require('gravatar');
const User = require('../models/User');

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if(user) {
      return next(
          new ErrorResponse(`User already exists`, 400)
      );
    }

    // Get user's gravatar
    req.body.avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    // Return JSONWebToken
  } catch(err) {
    return next(
        new ErrorResponse(err.message, 500)
    );
  }

  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  })
});