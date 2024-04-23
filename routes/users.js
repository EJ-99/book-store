const express = require('express');
const validator = require('../validators/userValidator');
const { checkValidationResult } = require('../validators/commonValidator');
const {
  join,
  login,
  requestPasswordReset,
  resetPassword,
} = require('../controller/userController');

const router = express.Router();
router.use(express.json());

// 회원가입
router.post(
  '/join',
  [validator.validateEmail, validator.validatePassword, checkValidationResult],
  join
);

// 로그인
router.post(
  '/login',
  [validator.validateEmail, validator.validatePassword, checkValidationResult],
  login
);

// 패스워드 초기화 요청
router.post(
  '/reset',
  [validator.validateEmail, checkValidationResult],
  requestPasswordReset
);

// 패스워드 초기화
router.put(
  '/reset',
  [validator.validateEmail, validator.validatePassword, checkValidationResult],
  resetPassword
);

module.exports = router;
