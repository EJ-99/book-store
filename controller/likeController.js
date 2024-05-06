const { StatusCodes } = require('http-status-codes');
const service = require('../service/likeService');

const addLike = async (req, res) => {
  const user = req.user;
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
