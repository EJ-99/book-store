const express = require('express');
const {
  validateLimit,
  validateCurrentPage,
  validateId,
  validateCategoryId,
  validateNew,
} = require('../validators/bookValidator');
const checkValidationResult = require('../validators/commonValidator');
const { getAllBooks, getBookDetail } = require('../controller/bookController');

const router = express.Router();
router.use(express.json());

router.get(
  '/',
  [
    validateLimit,
    validateCurrentPage,
    validateCategoryId,
    validateNew,
    checkValidationResult,
  ],
  getAllBooks
);

router.get('/:id', [validateId, checkValidationResult], getBookDetail);

module.exports = router;
