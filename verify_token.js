const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blackListerToken');

const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Check if token is blacklisted
      const blacklisted = await BlacklistedToken.findOne({ token });
      if (blacklisted) {
        return res.status(401).json({
          success: false,
          message: 'Token is blacklisted',
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user to req
      req.user = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};

module.exports = verifyToken;