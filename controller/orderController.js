const { StatusCodes } = require('http-status-codes');
const service = require('../service/orderService');
const jwt = require('jsonwebtoken');

const order = async (req, res) => {
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
  const { items, deliveryId, totalQuantity, totalPrice, firstBookTitle } =
    req.body;
  const orderInfo = { totalQuantity, totalPrice, userId, firstBookTitle };

  try {
    result = await service.createOrder(items, deliveryId, orderInfo);

    return res.status(StatusCodes.CREATED).end();
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getOrders = async (req, res) => {
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
    const result = await service.getOrders(userId);

    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    }

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getOrderDetail = async (req, res) => {
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
  const { id: orderId } = req.params;

  try {
    const result = await service.getOrderDetail(userId, orderId);

    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    }

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { order, getOrders, getOrderDetail };
