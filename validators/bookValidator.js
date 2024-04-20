const { query, param } = require('express-validator');

const validateLimit = query('limit')
  .escape()
  .notEmpty()
  .withMessage('limit cannot be empty')
  .isInt()
  .withMessage('check the type of limit');

const validateCurrentPage = query('currentPage')
  .escape()
  .notEmpty()
  .withMessage('currentPage cannot be empty')
  .isInt()
  .withMessage('check the type of currentPage');

const validateId = param('id')
  .escape()
  .notEmpty()
  .withMessage('bookId cannot be empty')
  .isInt()
  .withMessage('check the type of bookId');

const validateCategoryId = query('categoryId')
  .optional()
  .escape()
  .isInt()
  .withMessage('check the type of categoryId');

const validateNew = query('new')
  .optional()
  .escape()
  .isBoolean()
  .withMessage('check the type of new');

module.exports = {
  validateLimit,
  validateCurrentPage,
  validateId,
  validateCategoryId,
  validateNew,
};
