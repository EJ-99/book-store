const { StatusCodes } = require('http-status-codes');
const service = require('../service/cartService');

const addToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    const result = await service.updateCart(userId, bookId, quantity);

    return res.status(StatusCodes.OK).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getCartItmes = async (req, res) => {
  const { userId, selected } = req.body;

  try {
    const result = await service.getCartItems(userId, selected);

    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    }

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await service.removeCartItem(id);

    if (result.affectedRows) return res.status(StatusCodes.OK).end();

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { addToCart, getCartItmes, removeCartItem };
