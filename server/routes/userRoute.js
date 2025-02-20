const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {
  registerUserController,
  loginUserController,
} = require('../controllers/userController');

// Register User
router.route('/register').post(upload.none(), registerUserController);

// Login User
router.route('/login').post(upload.none(), loginUserController);

module.exports = router;
