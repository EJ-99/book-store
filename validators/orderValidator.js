const { body } = require('express-validator');

const validateDelivery = [
  body('delivery').exists().withMessage('delivery is required'),
  body('delivery.address')
    .notEmpty()
    .withMessage('address cannot be empty')
    .isString()
    .withMessage('address must be string'),
  body('delivery.receiver')
    .notEmpty()
    .withMessage('receiver cannot be empty')
    .isString()
    .withMessage('receiver must be string'),
  body('delivery.contact')
    .notEmpty()
    .withMessage('contact cannot be empty')
    .isString()
    .withMessage('contact must be string'),
];

const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('items must be an array and cannot be empty')
    .custom((items) => items.every(Number.isInteger))
    .withMessage('all items must be integers'),
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
  ...validateDelivery,
];

module.exports = { validateOrder };
