const pool = require('../db/mariadb');
const { objectKeysToCamel } = require('../utils/formatToCamelCase');

const findCartItem = async (userId, bookId) => {
  const sql = `SELECT * FROM cartItems WHERE user_id = ? AND book_id = ?`;
  const [result] = await pool.execute(sql, [userId, bookId]);
  return result[0];
};

const addCartItem = async (userId, bookId, quantity) => {
  const sql = `INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [userId, bookId, quantity]);

  if (result.affectedRows === 0) {
    throw new Error('장바구니 추가에 실패했습니다.');
  }
};

const updateItemQuantity = async (userId, bookId, quantity) => {
  const sql = `UPDATE cartItems SET quantity = quantity + ? WHERE user_id = ? AND book_id = ?`;
  const [result] = await pool.execute(sql, [quantity, userId, bookId]);

  if (result.affectedRows === 0) {
    throw new Error('장바구니 추가에 실패했습니다.');
  }
};

const updateCart = async (userId, bookId, quantity) => {
  const item = await findCartItem(userId, bookId);
  if (item) {
    return updateItemQuantity(userId, bookId, quantity);
  } else {
    return addCartItem(userId, bookId, quantity);
  }
};

const getCartItems = async (userId, selected) => {
  const sql = `SELECT cartItems.id AS cartItemId, book_id, title, summary, quantity, price
                FROM cartItems
                LEFT JOIN books
                ON cartItems.book_id = books.id
                WHERE user_id = ?
                ${selected ? 'AND cartItems.id IN (?)' : ''}`;

  let [result] = await pool.query(sql, [userId, selected]);

  if (result.length === 0) {
    throw new Error('장바구니 목록이 없습니다');
  }

  result = result.map((item) => objectKeysToCamel(item));
  return result;
};

const removeCartItem = async (userId, cartItemId) => {
  const sql = `DELETE FROM cartItems WHERE id = ? AND user_id = ?`;

  const [result] = await pool.query(sql, [cartItemId, userId]);

  if (result.affectedRows === 0) {
    throw new Error('장바구니 항목 삭제에 실패했습니다.');
  }
};

module.exports = {
  updateCart,
  getCartItems,
  removeCartItem,
};
