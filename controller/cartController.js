const { StatusCodes } = require('http-status-codes');
const service = require('../service/cartService');
const jwt = require('jsonwebtoken');

const addToCart = async (req, res) => {
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
  const { bookId, quantity } = req.body;

  try {
    await service.updateCart(userId, bookId, quantity);

    return res.status(StatusCodes.OK).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getCartItmes = async (req, res) => {
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
  const { selected } = req.body;

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

  const cartItemId = req.params.id;
  const userId = user.id;
  try {
    const result = await service.removeCartItem(userId, cartItemId);

    if (result.affectedRows) return res.status(StatusCodes.OK).end();

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { addToCart, getCartItmes, removeCartItem };
