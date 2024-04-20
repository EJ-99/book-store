const pool = require('../db/mariadb');

const findAllBooks = async (query) => {
  const { currentPage, limit, categoryId, new: isNew } = query;
  const offset = (currentPage - 1) * limit;
  let sql = `SELECT *,
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

  const [result] = await pool.execute(sql);
  return result;
};

const findBookById = async (bookId, userId) => {
  const sql = `SELECT books.id, title, img, categories.name as category, form,
                isbn, summary, detail, author, pages, contents, price, pub_date,
                (SELECT count(*) FROM likes 
                  WHERE liked_book_id=books.id) AS likes,
                (SELECT EXISTS (SELECT * FROM likes 
                    WHERE liked_book_id=books.id AND user_id="${userId}")) AS liked
                FROM books
                LEFT JOIN categories
                ON categories.id = books.category_id
                WHERE books.id = "${bookId}"`;

  const [result] = await pool.execute(sql);
  return result[0];
};

module.exports = {
  findAllBooks,
  findBookById,
};
