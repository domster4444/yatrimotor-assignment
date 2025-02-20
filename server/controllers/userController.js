const ErrorHandler = require('../utils/errorHandler.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel.js');
const { createGeneralJWT } = require('../utils/jwt');

//! REGISTER USER CONTROLLER
exports.registerUserController = catchAsyncErrors(async (req, res, next) => {
  const { userUniqueId, user_email, password, user_name, role } = req.body;

  try {
    const existingUser = await User.findOne({ user_email }).exec();
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with that email already exists. Try another email.',
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server Error' });
  }

  const newUser = new User({
    userUniqueId,
    user_email,
    password, // Virtual setter will hash it
    user_name,
    role: role || 'admin-account',
  });

  await newUser
    .save()
    .then((success) =>
      res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: success,
      })
    )
    .catch((err) => next(new ErrorHandler('Error creating user', 500)));
});

//! LOGIN USER CONTROLLER
exports.loginUserController = catchAsyncErrors(async (req, res, next) => {
  const { user_email, password } = req.body;

  const user = await User.findOne({ user_email }).exec();
  if (!user || !user.compareWithEncryptedPassword(password)) {
    return next(new ErrorHandler('Invalid email or password', 400));
  }

  const token = await createGeneralJWT(
    { _id: user._id, user_email, user_name: user.user_name, role: user.role },
    process.env.JWT_SECRET_KEY,
    '1d'
  );

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: {
      _id: user._id,
      user_email,
      user_name: user.user_name,
      role: user.role,
    },
    token,
  });
});
