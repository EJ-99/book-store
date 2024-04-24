const { StatusCodes } = require('http-status-codes');
const { findAllBooks, findBookById } = require('../service/bookService');

const getAllBooks = async (req, res) => {
  try {
    const result = await findAllBooks(req.query);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

const getBookDetail = async (req, res) => {
  let user = req.user;

  if (user instanceof Error) {
    user = null;
  }

  const userId = user ? user.id : null;
  const bookId = parseInt(req.params.id);

  try {
    const result = await findBookById(bookId, userId);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

module.exports = { getAllBooks, getBookDetail };
