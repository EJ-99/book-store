const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const checkValidationResult = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) return next();
  return res.status(StatusCodes.BAD_REQUEST).json(err.array());
};

module.exports = checkValidationResult;