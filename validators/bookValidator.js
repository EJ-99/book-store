const { query } = require('express-validator');

const validateGetBooks = [
  query('limit')
    .escape()
    .notEmpty()
    .withMessage('limit cannot be empty')
    .isInt()
    .withMessage('limit must be integer'),
  query('currentPage')
    .escape()
    .notEmpty()
    .withMessage('currentPage cannot be empty')
    .isInt()
    .withMessage('currentPage must be integer'),
  query('categoryId')
    .optional()
    .escape()
    .isInt()
    .withMessage('categoryId must be integer'),
  query('new')
    .optional()
    .escape()
    .isBoolean()
    .withMessage('new must be boolean'),
];

module.exports = {
  validateGetBooks,
};
