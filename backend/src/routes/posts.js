import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// create post (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Missing title or content" });

    const [result] = await pool.query(
      "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
      [req.user.id, title, content]
    );
    const insertId = result.insertId;
    const [[post]] = await pool.query(
      "SELECT p.id, p.title, p.content, p.created_at, u.id AS author_id, u.name AS author_name FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?",
      [insertId]
    );
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// read all posts
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.title, p.content, p.created_at, u.id AS author_id, u.name AS author_name
       FROM posts p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// get single post
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.title, p.content, p.created_at, u.id AS author_id, u.name AS author_name
       FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?`,
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ message: "Post not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// update post (only owner)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    // check owner
    const [rows] = await pool.query("SELECT user_id FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ message: "Post not found" });
    const ownerId = rows[0].user_id;
    if (ownerId !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await pool.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      req.params.id,
    ]);
    const [updated] = await pool.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// delete post (only owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT user_id FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ message: "Post not found" });
    if (rows[0].user_id !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await pool.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
