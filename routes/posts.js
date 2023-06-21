require("dotenv/config");
const express = require("express");
const pool = require("../routes/db");

const postRouter = express.Router();

// post
postRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      cover_url,
      publishedAt,
      isActive,
    } = req.body;

    const newBook = await pool.query(
      "INSERT INTO books (title, author, description, category, cover_url, publishedAt, isActive) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, author, description, category, cover_url, publishedAt, isActive]
    );

    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//별도로 get에 id를 주니까 브라우저에서 보임
postRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      text: "SELECT * FROM books WHERE id = $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: "책을 찾을 수 없습니다" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "내부 서버 오류입니다" });
  }
});

// GET 요청을 하는데, insomnia에서 2개만딱 보임
postRouter.get("/", async (req, res) => {
  try {
    let { limit, skip } = req.query;

    limit = limit || 50; // if limit is not provided, default it to 2
    skip = skip || 0; // if skip is not provided, default it to 0
    const query = {
      text: "SELECT * FROM books ORDER BY id ASC LIMIT $1 OFFSET $2",
      values: [limit, skip],
    };
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete는 id가 필요함
postRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM books WHERE id=$1", [id]);

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
});

module.exports = postRouter;
