const pool = require('../db/mariadb');
const { objectKeysToCamel } = require('../utils/formatToCamelCase');

const findAllBooks = async (query) => {
  const { currentPage, limit, categoryId, new: isNew } = query;
  const offset = (currentPage - 1) * limit;
  let sql = `SELECT SQL_CALC_FOUND_ROWS *,
              (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes 
              FROM books`;

  if (categoryId && isNew) {
    sql += ` WHERE category_id="${categoryId}" AND 
            pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
  } else if (categoryId) {
    sql += ` WHERE category_id="${categoryId}"`;
  } else if (isNew) {
    sql += ` WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
  }

  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  let [books] = await pool.execute(sql);

  if (books.length === 0) {
    throw new Error('도서 정보를 찾을 수 없습니다.');
  }

  books = books.map((book) => objectKeysToCamel(book));

  sql = `SELECT found_rows() AS totalCount`;
  const [pagination] = await pool.execute(sql);

  return {
    books,
    pagination: { ...pagination[0], currentPage: parseInt(currentPage) },
  };
};

const findBookById = async (bookId, userId) => {
  let sql = `SELECT books.id, title, img, categories.name as category, form,
                isbn, summary, detail, author, pages, contents, price, pub_date,
                (SELECT count(*) FROM likes 
                  WHERE liked_book_id=books.id) AS likes`;
  const values = [];

  if (userId) {
    sql += `, (SELECT EXISTS (SELECT * FROM likes 
                WHERE liked_book_id=books.id AND user_id= ? )) AS liked`;
    values.push(userId);
  }

  sql += ` FROM books
          LEFT JOIN categories
          ON categories.id = books.category_id
          WHERE books.id = ?`;
  values.push(bookId);

  let [result] = await pool.execute(sql, values);

  if (result.length === 0) {
    throw new Error('도서 상세 정보를 찾을 수 없습니다.');
  }

  result = objectKeysToCamel(result[0]);
  return result;
};

module.exports = {
  findAllBooks,
  findBookById,
};
