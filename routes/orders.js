const express = require('express');
const controller = require('../controller/orderController');
const { validateOrder } = require('../validators/orderValidator');
const {
  validateId,
  checkValidationResult,
} = require('../validators/commonValidator');
const { authenticateToken } = require('../auth');

const router = express.Router();
router.use(express.json());

// 주문하기
router.post(
  '/',
  validateOrder,
  checkValidationResult,
  authenticateToken,
  controller.order
);

// 주문 목록 조회
router.get('/', authenticateToken, controller.getOrders);

//주문 상세 조회
router.get(
  '/:id',
  validateId,
  checkValidationResult,
  authenticateToken,
  controller.getOrderDetail
);

module.exports = router;
