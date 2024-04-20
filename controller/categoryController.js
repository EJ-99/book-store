const { StatusCodes } = require('http-status-codes');
const { fetchCategories } = require('../service/categoryService');

const getCategories = async (req, res) => {
  try {
    const result = await fetchCategories();
    if (result.length) {
      return res.status(StatusCodes.OK).json(result);
    }
    return res.status(StatusCodes.NOT_FOUND).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { getCategories };
