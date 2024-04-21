const pool = require('../db/mariadb');

const insertDeliveryInfo = async (delivery) => {
  const sql = `INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)`;
  const values = [delivery.address, delivery.receiver, delivery.contact];
  const [result] = await pool.query(sql, values);

  return result.insertId;
};

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

  await pool.query(sql, [values]);
};

const deleteCartItems = async (items) => {
  const sql = `DELETE FROM cartItems WHERE id IN (?)`;
  await pool.query(sql, [items]);
};

const createOrder = async (items, delivery, orderInfo) => {
  const deliveryId = await insertDeliveryInfo(delivery);
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

  const [result] = await pool.execute(sql, [userId]);
  return result;
};

const getOrderDetail = async (id) => {
  const sql = `SELECT book_id, title, author, quantity, price 
                FROM orderedBooks
                LEFT JOIN books
                ON orderedBooks.book_id = books.id
                WHERE order_id = ?`;

  const [result] = await pool.execute(sql, [id]);
  return result;
};

module.exports = { createOrder, getOrders, getOrderDetail };
