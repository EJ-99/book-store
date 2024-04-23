const express = require('express');
const validator = require('../validators/cartValidator');
const {
  validateId,
  checkValidationResult,
} = require('../validators/commonValidator');
const controller = require('../controller/cartController');

const router = express.Router();
router.use(express.json());

// 장바구니 추가
router.post(
  '/',
  [validator.validateAddCart, checkValidationResult],
  controller.addToCart
);

// (선택된) 장바구니 조회
router.get(
  '/',
  [validator.validateGetCarts, checkValidationResult],
  controller.getCartItmes
);

// 장바구니 삭제
router.delete(
  '/:id',
  [validateId, checkValidationResult],
  controller.removeCartItem
);

module.exports = router;
