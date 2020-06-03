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

  // Create player

  // Create terrestrial-type planet in random coordinates

  res.status(201).json({
    success: true,
    token
  })
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if(!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});