const { body } = require('express-validator');

const validateEmail = body('email')
  .escape()
  .notEmpty()
  .withMessage('email cannot be empty')
  .isEmail()
  .withMessage('check the type of email');

const validatePassword = body('password')
  .escape()
  .notEmpty()
  .withMessage('password cannot be empty')
  .isString()
  .withMessage('check the type of password');

module.exports = {
  validateEmail,
  validatePassword,
};
