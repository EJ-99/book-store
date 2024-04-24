const { StatusCodes } = require('http-status-codes');
const service = require('../service/deliveryService');
const { handleTokenError } = require('../auth');

const addDelivery = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

  const tokenError = handleTokenError(user, res);
  if (tokenError) return tokenError;

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
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getDeliveries = async (req, res) => {
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
    const result = await service.getDeliveries(userId);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

module.exports = { addDelivery, getDeliveries };
