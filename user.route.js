const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
} = require('../controller/authController');
const verifyToken = require('../middlewares/verify_token');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, getMe);

module.exports = router;