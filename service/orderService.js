const pool = require('../db/mariadb');
const { objectKeysToCamel } = require('../utils/formatToCamelCase');

const insertOrderInfo = async (deliveryId, orderInfo) => {
  const { firstBookTitle, totalQuantity, totalPrice, userId } = orderInfo;
  const sql = `INSERT INTO orders (book_title, total_quantity, total_price, delivery_id, user_id)
                VALUES (?, ?, ?, ?, ?)`;
  const values = [
    firstBookTitle,
    totalQuantity,
    totalPrice,
    deliveryId,
    userId,
  ];
  const [result] = await pool.query(sql, values);

  if (result.affectedRows === 0) {
    throw new Error('주문 등록에 실패했습니다.');
  }

  return result.insertId;
};

const getOrderedItems = async (items) => {
  const sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
  const [result] = await pool.query(sql, [items]);

  return result;
};

const insertOrderedItems = async (orderId, items) => {
  const orderedItems = await getOrderedItems(items);
  const sql = `INSERT INTO orderedBooks (order_id, book_id, quantity)
                VALUES ?`;
  const values = orderedItems.map((item) => [
    orderId,
    item.book_id,
    item.quantity,
  ]);

  const [result] = await pool.query(sql, [values]);

  if (result.affectedRows === 0) {
    throw new Error('주문 항목 등록에 실패했습니다.');
  }
};

const deleteCartItems = async (items) => {
  const sql = `DELETE FROM cartItems WHERE id IN (?)`;
  const [result] = await pool.query(sql, [items]);

  if (result.affectedRows === 0) {
    throw new Error('장바구니 항목 삭제에 실패했습니다.');
  }
};

const createOrder = async (items, deliveryId, orderInfo) => {
  const orderId = await insertOrderInfo(deliveryId, orderInfo);
  await insertOrderedItems(orderId, items);
  await deleteCartItems(items);

  return orderId;
};

const getOrders = async (userId) => {
  const sql = `SELECT orders.id, ordered_at, address, receiver, contact, book_title, total_quantity, total_price 
                FROM orders
                LEFT JOIN deliveries
                ON orders.delivery_id = deliveries.id
                WHERE orders.user_id = ?`;

  let [result] = await pool.execute(sql, [userId]);

  if (result.length === 0) {
    throw new Error('주문 정보를 찾을 수 없습니다.');
  }

  result = result.map((item) => objectKeysToCamel(item));
  return result;
};

const getOrderDetail = async (userId, orderId) => {
  const sql = `SELECT book_id, title, author, quantity, price 
                FROM orderedBooks
                LEFT JOIN books
                ON orderedBooks.book_id = books.id
                WHERE order_id = ? AND (SELECT user_id FROM orders WHERE id = ?) = ?`;

  let [result] = await pool.execute(sql, [orderId, orderId, userId]);

  if (result.length === 0) {
    throw new Error('주문 상세 정보를 찾을 수 없습니다.');
  }

  result = result.map((item) => objectKeysToCamel(item));
  return result;
};

module.exports = { createOrder, getOrders, getOrderDetail };
