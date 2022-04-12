const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgatPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').get(userController.getUser);
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
