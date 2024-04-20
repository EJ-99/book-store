const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/:bookId');
router.delete('/:bookId');

module.exports = router;
