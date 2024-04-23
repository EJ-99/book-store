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

module.exports = authenticateToken;
