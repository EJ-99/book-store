const { StatusCodes } = require('http-status-codes');
const service = require('../service/deliveryService');

const addDelivery = async (req, res) => {
  const { userId, address, receiver, contact } = req.body;

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
  const { userId } = req.body;

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
