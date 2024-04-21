const { StatusCodes } = require('http-status-codes');
const service = require('../service/orderService');

const order = async (req, res) => {
  const {
    items,
    deliveryId,
    totalQuantity,
    totalPrice,
    userId,
    firstBookTitle,
  } = req.body;
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
  const { userId } = req.body;

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
  const { id } = req.params;

  try {
    const result = await service.getOrderDetail(id);

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
