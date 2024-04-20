const express = require('express');
const {
  validateEmail,
  validatePassword,
  checkValidationResult,
} = require('../validators/userValidator');
const {
  join,
  login,
  requestPasswordReset,
  resetPassword,
} = require('../controller/userController');

const router = express.Router();
router.use(express.json());

router.post(
  '/join',
  [validateEmail, validatePassword, checkValidationResult],
  join
);

router.post(
  '/login',
  [validateEmail, validatePassword, checkValidationResult],
  login
);

router.post(
  '/reset',
  [validateEmail, checkValidationResult],
  requestPasswordReset
);

router.put(
  '/reset',
  [validateEmail, validatePassword, checkValidationResult],
  resetPassword
);

module.exports = router;
