const express = require('express');
const {
  validateId,
  checkValidationResult,
} = require('../validators/commonValidator');
const { addLike, deleteLike } = require('../controller/likeController');
const router = express.Router();
router.use(express.json());

router.post('/:id', [validateId, checkValidationResult], addLike);
router.delete('/:id', [validateId, checkValidationResult], deleteLike);

module.exports = router;
