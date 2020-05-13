const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const gravatar = require('gravatar');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Private/Admin
exports.register = asyncHandler(async (req, res, next) => {
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

  } catch(err) {
    return next(
        new ErrorResponse(err.message, 500)
    );
  }

  const user = await User.create(req.body);

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token
  })
});