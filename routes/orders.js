const express = require(express);

const router = express.Router();
router.use(express.json());

router.post('/');
router.get('/');
router.get('/:orderId');

module.exports = router;
