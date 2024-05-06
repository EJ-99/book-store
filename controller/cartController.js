const { StatusCodes } = require('http-status-codes');
const service = require('../service/cartService');

const addToCart = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { bookId, quantity } = req.body;

  try {
    await service.updateCart(userId, bookId, quantity);
    return res.status(StatusCodes.OK).end();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const getCartItmes = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { selected } = req.body;

  try {
    const result = await service.getCartItems(userId, selected);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const user = req.user;
  const cartItemId = req.params.id;
  const userId = user.id;
  try {
    await service.removeCartItem(userId, cartItemId);
    return res.status(StatusCodes.OK).end();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { addToCart, getCartItmes, removeCartItem };
