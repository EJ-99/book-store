const { body } = require('express-validator');

const validateAddCart = [
  body('bookId')
    .escape()
    .notEmpty()
    .withMessage('bookId cannot be empty')
    .isInt()
    .withMessage('bookId must be integer'),
  body('quantity')
    .escape()
    .notEmpty()
    .withMessage('quantity cannot be empty')
    .isInt()
    .withMessage('quantity must be integer'),
];

const validateGetCarts = [
  body('selected')
    .optional()
    .isArray({ min: 1 })
    .withMessage('selected must be an array and cannot be empty')
    .custom((items) => items.every(Number.isInteger))
    .withMessage('All items in selected must be integers'),
];

module.exports = {
  validateAddCart,
  validateGetCarts,
};
