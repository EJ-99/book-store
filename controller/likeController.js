const { StatusCodes } = require('http-status-codes');
const service = require('../service/likeService');
const { handleTokenError } = require('../auth');

const addLike = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

  const tokenError = handleTokenError(user, res);
  if (tokenError) return tokenError;

  const userId = user.id;
  const bookId = req.params.id;

  try {
    await service.checkAlreadyLike(userId, bookId);
    await service.addLike(userId, bookId);
    return res.status(StatusCodes.OK).end();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const deleteLike = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: '로그인이 필요한 서비스입니다' });
  }

  const tokenError = handleTokenError(user, res);
  if (tokenError) return tokenError;

  const userId = user.id;
  const bookId = req.params.id;

  try {
    await service.deleteLike(userId, bookId);
    return res.status(StatusCodes.OK).end();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { addLike, deleteLike };
