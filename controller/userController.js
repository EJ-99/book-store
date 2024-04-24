const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {
  createUser,
  verifyPassword,
  findUser,
  updatePassword,
} = require('../service/userService');

dotenv.config();

const join = async (req, res) => {
  const { email, password } = req.body;

  try {
    await createUser(email, password);
    return res.status(StatusCodes.CREATED).end();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await verifyPassword(email, password);
    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
      expiresIn: '30m',
    });

    res.cookie('token', token, { httpOnly: true });
    return res.status(StatusCodes.OK).end();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUser(email);
    if (user) {
      return res.status(StatusCodes.OK).json({ email });
    }
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    await updatePassword(email, password);
    return res.status(StatusCodes.OK).end();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = { join, login, requestPasswordReset, resetPassword };
