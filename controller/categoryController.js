const { StatusCodes } = require('http-status-codes');
const { fetchCategories } = require('../service/categoryService');

const getCategories = async (req, res) => {
  try {
    const result = await fetchCategories();
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

module.exports = { getCategories };
