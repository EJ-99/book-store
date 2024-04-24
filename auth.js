const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
dotenv.config();

const authenticateToken = (req, res, next) => {
  const receivedJwt = req.headers['authorization'];

  if (!receivedJwt) {
    return next();
  }

  try {
    const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

    req.user = decodedJwt;

    return next();
  } catch (err) {
    req.user = err;
    return next();
  }
};

const handleTokenError = (user, res) => {
  if (user instanceof jwt.TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인 세션이 만료되었습니다.' });
  }

  if (user instanceof jwt.JsonWebTokenError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '유효하지 않은 토큰입니다.' });
  }

  return null;
};

module.exports = { authenticateToken, handleTokenError };
