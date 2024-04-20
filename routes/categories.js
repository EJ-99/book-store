const express = require('express');
const { getCategories } = require('../controller/categoryController');
const router = express.Router();
router.use(express.json());

router.get('/', getCategories);

module.exports = router;
