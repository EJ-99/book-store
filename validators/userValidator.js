const { validationResult, body } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const checkValidationResult = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) return next();
  return res.status(StatusCodes.BAD_REQUEST).json(err.array());
};

const validateEmail = body('email')
  .notEmpty()
  .withMessage('email cannot be empty')
  .isEmail()
  .withMessage('check email type');

const validatePassword = body('password')
  .notEmpty()
  .withMessage('password cannot be empty')
  .isString()
  .withMessage('check password type');

module.exports = {
  validateEmail,
  validatePassword,
  checkValidationResult,
};
