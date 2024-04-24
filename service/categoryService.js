const pool = require('../db/mariadb');

const fetchCategories = async () => {
  const sql = `SELECT * FROM categories`;
  const [result] = await pool.execute(sql);

  if (result.length === 0) {
    throw new Error('카테고리 목록을 찾을 수 없습니다.');
  }

  return result;
};

module.exports = { fetchCategories };
