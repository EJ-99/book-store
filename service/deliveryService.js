const pool = require('../db/mariadb');

const addDelivery = async (userId, address, receiver, contact) => {
  const sql = `INSERT INTO deliveries (address, receiver, contact, user_id) VALUES (?, ?, ?, ?)`;
  const values = [address, receiver, contact, userId];
  const [result] = await pool.query(sql, values);

  if (result.affectedRows === 0) {
    throw new Error('배송지 등록에 실패했습니다.');
  }

  return result.insertId;
};

const getDeliveries = async (userId) => {
  const sql = `SELECT id as deliveryId, address, receiver, contact FROM deliveries WHERE user_id = ?`;

  const [result] = await pool.query(sql, userId);

  if (result.length === 0) {
    throw new Error('배송지 정보를 찾을 수 없습니다.');
  }

  return result;
};

module.exports = { addDelivery, getDeliveries };
