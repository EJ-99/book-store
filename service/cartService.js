const pool = require('../db/mariadb');

const findCartItem = async (userId, bookId) => {
  const sql = `SELECT * FROM cartItems WHERE user_id = ? AND book_id = ?`;
  const [result] = await pool.execute(sql, [userId, bookId]);
  return result[0];
};

const addCartItem = async (userId, bookId, quantity) => {
  const sql = `INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)`;
  const [result] = await pool.execute(sql, [userId, bookId, quantity]);
  return result;
};

const updateItemQuantity = async (userId, bookId, quantity) => {
  const sql = `UPDATE cartItems SET quantity = quantity + ? WHERE user_id = ? AND book_id = ?`;
  const [result] = await pool.execute(sql, [quantity, userId, bookId]);
  return result;
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
  const sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
                FROM cartItems
                LEFT JOIN books
                ON cartItems.book_id = books.id
                WHERE user_id = ?
                ${selected ? 'AND cartItems.id IN (?)' : ''}`;

  const [result] = await pool.query(sql, [userId, selected]);

  return result;
};

const removeCartItem = async (id) => {
  const sql = `DELETE FROM cartItems WHERE id = ?`;

  const [result] = await pool.query(sql, id);

  return result;
};

module.exports = {
  updateCart,
  getCartItems,
  removeCartItem,
};