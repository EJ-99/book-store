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

  if (result.affectedRows === 0) {
    throw new Error('회원 가입에 실패했습니다.');
  }

  return result;
};

const verifyPassword = async (email, password) => {
  let user;
  try {
    user = await findUser(email);
  } catch (err) {
    throw new Error('이메일 혹은 비밀번호가 틀렸습니다.');
  }

  const hashed = hashPassword(password, user.salt);
  if (hashed !== user.password) {
    throw new Error('이메일 혹은 비밀번호가 틀렸습니다.');
  }

  return user;
};

const findUser = async (email) => {
  let sql = `SELECT * FROM users WHERE email = ?`;
  const params = [email];
  const [result] = await pool.execute(sql, params);

  if (result.length === 0) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  return result[0];
};

const updatePassword = async (email, password) => {
  const salt = crypto.randomBytes(10).toString('base64');
  const hashed = hashPassword(password, salt);

  let sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
  const params = [hashed, salt, email];
  const [result] = await pool.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error('비밀번호 업데이트에 실패했습니다.');
  }
};

module.exports = { createUser, verifyPassword, findUser, updatePassword };
