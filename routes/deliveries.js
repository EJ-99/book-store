const express = require('express');
const controller = require('../controller/deliveryController');
const { validateDelivery } = require('../validators/deliveryValidators');
const { checkValidationResult } = require('../validators/commonValidator');

const router = express.Router();
router.use(express.json());

router.post(
  '/',
  validateDelivery,
  checkValidationResult,
  controller.addDelivery
);
router.get('/', controller.getDeliveries);

module.exports = router;
