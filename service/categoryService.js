const pool = require('../db/mariadb');

const fetchCategories = async () => {
  const sql = `SELECT * FROM categories`;
  const [result] = await pool.execute(sql);
  return result;
};

module.exports = { fetchCategories };
