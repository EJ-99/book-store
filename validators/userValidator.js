const { body } = require('express-validator');

const validateEmail = body('email')
  .escape()
  .notEmpty()
  .withMessage('email cannot be empty')
  .isEmail()
  .withMessage('check email type');

const validatePassword = body('password')
  .escape()
  .notEmpty()
  .withMessage('password cannot be empty')
  .isString()
  .withMessage('check password type');

module.exports = {
  validateEmail,
  validatePassword,
};
