const { body } = require('express-validator');

const validateBookId = body('bookId')
  .escape()
  .notEmpty()
  .withMessage('bookId cannot be empty')
  .isInt()
  .withMessage('check the type of bookId');

const validateQuantity = body('quantity')
  .escape()
  .notEmpty()
  .withMessage('quantity cannot be empty')
  .isInt()
  .withMessage('check the type of quantity');

const validateSelected = body('selected')
  .optional()
  .isArray({ min: 1 })
  .withMessage('selected must be an array and cannot be empty')
  .custom((items) => items.every(Number.isInteger))
  .withMessage('All items must be integers');

module.exports = {
  validateBookId,
  validateQuantity,
  validateSelected,
};
