const pool = require('../db/mariadb');

const addDelivery = async (userId, address, receiver, contact) => {
  const sql = `INSERT INTO deliveries (address, receiver, contact, user_id) VALUES (?, ?, ?, ?)`;
  const values = [address, receiver, contact, userId];
  const [result] = await pool.query(sql, values);
  return result.insertId;
};

const getDeliveries = async (userId) => {
  const sql = `SELECT id as deliveryId, address, receiver, contact FROM deliveries WHERE user_id = ?`;

  const [result] = await pool.query(sql, userId);
  return result;
};

module.exports = { addDelivery, getDeliveries };
