const express = require('express');
const controller = require('../controller/deliveryController');
const { validateDelivery } = require('../validators/deliveryValidators');
const { checkValidationResult } = require('../validators/commonValidator');
const { authenticateToken } = require('../auth');

const router = express.Router();
router.use(express.json());

// 배송지 등록
router.post(
  '/',
  validateDelivery,
  checkValidationResult,
  authenticateToken,
  controller.addDelivery
);

// 배송지 목록 조회
router.get('/', authenticateToken, controller.getDeliveries);

module.exports = router;
