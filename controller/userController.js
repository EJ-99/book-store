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
    const result = await createUser(email, password);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await verifyPassword(email, password);

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
        expiresIn: '30m',
      });

      res.cookie('token', token, { httpOnly: true });
      return res.status(StatusCodes.OK).end();
    }

    return res.status(StatusCodes.UNAUTHORIZED).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUser(email);
    if (user) {
      return res.status(StatusCodes.OK).json({ email });
    }
    return res.status(StatusCodes.UNAUTHORIZED).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await updatePassword(email, password);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).end();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
};

module.exports = { join, login, requestPasswordReset, resetPassword };
