const { StatusCodes } = require('http-status-codes');
const { findAllBooks, findBookById } = require('../service/bookService');

const getAllBooks = async (req, res) => {
  try {
    const result = await findAllBooks(req.query);
    if (result.books.length) {
      return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const getBookDetail = async (req, res) => {
  const user = req.user;

  if (user instanceof Error) {
    user = null;
  }

  const userId = user ? user.id : null;
  const bookId = parseInt(req.params.id);

  try {
    const result = await findBookById(bookId, userId);
    if (result) {
      return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { getAllBooks, getBookDetail };
