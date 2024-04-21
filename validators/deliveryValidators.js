const { body } = require('express-validator');

const validateDelivery = [
  body('address')
    .notEmpty()
    .withMessage('address cannot be empty')
    .isString()
    .withMessage('address must be string'),
  body('receiver')
    .notEmpty()
    .withMessage('receiver cannot be empty')
    .isString()
    .withMessage('receiver must be string'),
  body('contact')
    .notEmpty()
    .withMessage('contact cannot be empty')
    .isString()
    .withMessage('contact must be string'),
];

module.exports = { validateDelivery };
