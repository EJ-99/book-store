const { StatusCodes } = require('http-status-codes');
const service = require('../service/orderService');
const { handleTokenError } = require('../auth');

const order = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

  const tokenError = handleTokenError(user, res);
  if (tokenError) return tokenError;

  const userId = user.id;
  const { items, deliveryId, totalQuantity, totalPrice, firstBookTitle } =
    req.body;
  const orderInfo = { totalQuantity, totalPrice, userId, firstBookTitle };

  try {
    result = await service.createOrder(items, deliveryId, orderInfo);

    return res.status(StatusCodes.CREATED).end();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

  const tokenError = handleTokenError(user, res);
  if (tokenError) return tokenError;

  const userId = user.id;

  try {
    const result = await service.getOrders(userId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

const getOrderDetail = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

  const tokenError = handleTokenError(user, res);
  if (tokenError) return tokenError;

  const userId = user.id;
  const { id: orderId } = req.params;

  try {
    const result = await service.getOrderDetail(userId, orderId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

module.exports = { order, getOrders, getOrderDetail };
