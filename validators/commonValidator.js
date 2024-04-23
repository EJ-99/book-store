const { validationResult, param } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const checkValidationResult = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) return next();
  return res.status(StatusCodes.BAD_REQUEST).json(err.array());
};

const validateId = param('id')
  .escape()
  .notEmpty()
  .withMessage('id cannot be empty')
  .isInt()
  .withMessage('id must be integer');

module.exports = { checkValidationResult, validateId };
