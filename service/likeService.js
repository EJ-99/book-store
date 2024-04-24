const pool = require('../db/mariadb');

const checkAlreadyLike = async (userId, bookId) => {
  const sql = `SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?`;
  const values = [userId, bookId];

  const [result] = await pool.execute(sql, values);

  if (result.length > 0) {
    throw new Error('이미 좋아요를 추가했습니다.');
  }
};

const addLike = async (userId, bookId) => {
  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
  const values = [userId, bookId];

  const [result] = await pool.execute(sql, values);

  if (result.affectedRows === 0) {
    throw new Error('좋아요 추가에 실패했습니다.');
  }
};

const deleteLike = async (userId, bookId) => {
  const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
  const values = [userId, bookId];

  const [result] = await pool.execute(sql, values);

  if (result.affectedRows === 0) {
    throw new Error('좋아요 취소에 실패했습니다.');
  }
};

module.exports = { checkAlreadyLike, addLike, deleteLike };
