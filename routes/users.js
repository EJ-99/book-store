const express = require(express);

const router = express.Router();
router.use(express.json());

router.post('/join');
router.post('/login');
router.post('/reset');
router.put('/reset');

module.exports = router;
