const { StatusCodes } = require('http-status-codes');
const service = require('../service/deliveryService');
const jwt = require('jsonwebtoken');

const addDelivery = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

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

  const userId = user.id;
  const { address, receiver, contact } = req.body;

  try {
    const deliveryId = await service.addDelivery(
      userId,
      address,
      receiver,
      contact
    );

    return res.status(StatusCodes.CREATED).json({ deliveryId });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getDeliveries = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

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

  const userId = user.id;

  try {
    const result = await service.getDeliveries(userId);

    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    }

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { addDelivery, getDeliveries };
