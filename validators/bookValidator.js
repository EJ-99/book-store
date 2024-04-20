const { query, param } = require('express-validator');

const validateLimit = query('limit')
  .escape()
  .notEmpty()
  .withMessage('limit cannot be empty')
  .isInt()
  .withMessage('check limit type');

const validateCurrentPage = query('currentPage')
  .escape()
  .notEmpty()
  .withMessage('currentPage cannot be empty')
  .isInt()
  .withMessage('check currentPage type');

const validateId = param('id')
  .escape()
  .notEmpty()
  .withMessage('bookId cannot be empty')
  .isInt()
  .withMessage('check bookId type');

const validateCategoryId = query('categoryId')
  .optional()
  .escape()
  .isInt()
  .withMessage('check currentPage type');

const validateNew = query('new')
  .optional()
  .escape()
  .isBoolean()
  .withMessage('new field must be boolean type');

module.exports = {
  validateLimit,
  validateCurrentPage,
  validateId,
  validateCategoryId,
  validateNew,
};
