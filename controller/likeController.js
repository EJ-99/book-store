const { StatusCodes } = require('http-status-codes');
const service = require('../service/likeService');

const addLike = async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.body;

  try {
    const result = await service.addLike(bookId, userId);
    if (result.affectedRows) {
      return res.status(StatusCodes.OK).end();
    }

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const deleteLike = async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.body;

  try {
    const result = await service.deleteLike(bookId, userId);
    if (result.affectedRows) {
      return res.status(StatusCodes.OK).end();
    }

    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { addLike, deleteLike };
