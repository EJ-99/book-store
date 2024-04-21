const express = require('express');
const controller = require('../controller/orderController');
const { validateOrder } = require('../validators/orderValidator');
const {
  validateId,
  checkValidationResult,
} = require('../validators/commonValidator');

const router = express.Router();
router.use(express.json());

router.post('/', validateOrder, checkValidationResult, controller.order);
router.get('/', controller.getOrders);
router.get(
  '/:id',
  validateId,
  checkValidationResult,
  controller.getOrderDetail
);

module.exports = router;
