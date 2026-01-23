import { dbPool } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  const [rows] = await dbPool.query("SELECT * FROM products");
  res.json(rows);
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  const [rows] = await dbPool.query("SELECT * FROM products WHERE id=?", [id]);

  if (!rows.length)
    return res.status(404).json({ message: "Product not found" });

  res.json(rows[0]);
};
