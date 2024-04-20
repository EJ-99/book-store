const express = require(express);

const router = express.Router();
router.use(express.json());

router.get('/');

module.exports = router;
