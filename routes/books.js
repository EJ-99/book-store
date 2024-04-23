const express = require('express');
const { validateGetBooks } = require('../validators/bookValidator');
const {
  checkValidationResult,
  validateId,
} = require('../validators/commonValidator');
const { getAllBooks, getBookDetail } = require('../controller/bookController');

const router = express.Router();
router.use(express.json());

// (카테고리 & 신간별) 도서 전체 조회
router.get('/', [validateGetBooks, checkValidationResult], getAllBooks);

// 상세 도서 조회
router.get('/:id', [validateId, checkValidationResult], getBookDetail);

module.exports = router;
