const { body } = require('express-validator');

const validateEmail = body('email')
  .escape()
  .notEmpty()
  .withMessage('email cannot be empty')
  .isEmail()
  .withMessage('email must be email format');

const validatePassword = body('password')
  .escape()
  .notEmpty()
  .withMessage('password cannot be empty')
  .isString()
  .withMessage('password must be string');

module.exports = {
  validateEmail,
  validatePassword,
};
