const express = require('express');
const {
  validateBookId,
  validateQuantity,
  validateSelected,
} = require('../validators/cartValidator');
const {
  validateId,
  checkValidationResult,
} = require('../validators/commonValidator');
const controller = require('../controller/cartController');

const router = express.Router();
router.use(express.json());

router.post(
  '/',
  [validateBookId, validateQuantity, checkValidationResult],
  controller.addToCart
);

router.get(
  '/',
  [validateSelected, checkValidationResult],
  controller.getCartItmes
);

router.delete(
  '/:id',
  [validateId, checkValidationResult],
  controller.removeCartItem
);

module.exports = router;
