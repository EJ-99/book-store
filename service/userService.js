const pool = require('../db/mariadb');
const crypto = require('crypto');

const hashPassword = (password, salt) => {
  const result = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');

  return result;
};

const createUser = async (email, password) => {
  const salt = crypto.randomBytes(10).toString('base64');
  const hashed = hashPassword(password, salt);

  const sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
  const values = [email, hashed, salt];
  const [result] = await pool.execute(sql, values);

  return result;
};

const verifyPassword = async (email, password) => {
  const user = await findUser(email);
  if (!user) return false;

  const hashed = hashPassword(password, user.salt);
  return hashed === user.password ? user : null;
};

const findUser = async (email) => {
  let sql = `SELECT * FROM users WHERE email = ?`;
  const params = [email];
  const [result] = await pool.execute(sql, params);

  return result[0];
};

const updatePassword = async (email, password) => {
  const salt = crypto.randomBytes(10).toString('base64');
  const hashed = hashPassword(password, salt);

  let sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
  const params = [hashed, salt, email];
  const [result] = await pool.execute(sql, params);

  return result;
};

module.exports = { createUser, verifyPassword, findUser, updatePassword };
