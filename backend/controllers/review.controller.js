import { dbPool } from "../config/db.js";

export const getReviews = async (req, res) => {
  const { productId } = req.params;

  const [rows] = await dbPool.query(
    "SELECT * FROM review WHERE productId = ? ORDER BY date DESC",
    [productId]
  );

  res.json(rows);
};

export const addReview = async (req, res) => {
  const { productId, name, image, email, rating, review } = req.body;

  const date = new Date();

  await dbPool.query(
    "INSERT INTO review (productId, name, image, email, rating, review, date) VALUES (?,?,?,?,?,?,?)",
    [productId, name, image, email, rating, review, date]
  );

  res.json({ success: true, message: "Review added" });
};
