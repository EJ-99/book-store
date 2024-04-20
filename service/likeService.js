const pool = require('../db/mariadb');

const addLike = async (userId, bookId) => {
  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
  const values = [userId, bookId];

  const [result] = await pool.execute(sql, values);

  return result;
};

const deleteLike = async (userId, bookId) => {
  const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
  const values = [userId, bookId];

  const [result] = await pool.execute(sql, values);

  return result;
};

module.exports = { addLike, deleteLike };
