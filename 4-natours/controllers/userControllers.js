const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// The CRUD functions for the users

// Create a new user
exports.createUser = (_req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  console.log(users);

  // Send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
// Get user by id
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // user.findOne({ _id: req.params.id })

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Update a user by id
// exports.updateUser = (_req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined'
//   });
// };

//   // Delete a user by id
//   exports.deleteUser = (_req, res) => {
//     res.status(500).json({
//       status: 'error',
//       message: 'This route is not yet defined',
//     });
//   };
