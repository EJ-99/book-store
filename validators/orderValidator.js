const { body } = require('express-validator');

const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('items must be an array and cannot be empty')
    .custom((items) => items.every(Number.isInteger))
    .withMessage('all items must be integers'),
  body('deliveryId')
    .escape()
    .notEmpty()
    .withMessage('deliveryId cannot be empty')
    .isInt()
    .withMessage('deliveryId must be integer'),
  body('totalQuantity')
    .escape()
    .notEmpty()
    .withMessage('totalQuantity cannot be empty')
    .isInt()
    .withMessage('totalQuantity must be integer'),
  body('totalPrice')
    .escape()
    .notEmpty()
    .withMessage('totalPrice cannot be empty')
    .isInt()
    .withMessage('totalPrice must be integer'),
  body('firstBookTitle')
    .escape()
    .notEmpty()
    .withMessage('firstBookTitle cannot be empty')
    .isString()
    .withMessage('firstBookTitle must be string'),
];

module.exports = { validateOrder };
