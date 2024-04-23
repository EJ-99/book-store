const express = require('express');
const {
  validateId,
  checkValidationResult,
} = require('../validators/commonValidator');
const { addLike, deleteLike } = require('../controller/likeController');
const authenticateToken = require('../auth');

const router = express.Router();
router.use(express.json());

router.post(
  '/:id',
  [validateId, checkValidationResult],
  authenticateToken,
  addLike
);
router.delete(
  '/:id',
  [validateId, checkValidationResult],
  authenticateToken,
  deleteLike
);

module.exports = router;
