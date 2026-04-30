// import { dbPool } from "../config/db.js";

// export const getAllProducts = async (req, res) => {
//   const [rows] = await dbPool.query("SELECT * FROM products");
//   res.json(rows);
// };

// export const getProduct = async (req, res) => {
//   const { id } = req.params;

//   const [rows] = await dbPool.query("SELECT * FROM products WHERE id=?", [id]);

//   if (!rows.length)
//     return res.status(404).json({ message: "Product not found" });

//   res.json(rows[0]);
// };

import { dbPool } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  const [rows] = await dbPool.query("SELECT * FROM products");
  const products = rows.map(p => ({
    ...p,
    images_json: JSON.parse(p.images_json || '[]'),
    Tags_json: JSON.parse(p.Tags_json || '[]')
  }));
  res.json(products);
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const [rows] = await dbPool.query("SELECT * FROM products WHERE id=?", [id]);

  if (!rows.length)
    return res.status(404).json({ message: "Product not found" });

  const product = {
    ...rows[0],
    images_json: JSON.parse(rows[0].images_json || '[]'),
    Tags_json: JSON.parse(rows[0].Tags_json || '[]')
  };

  res.json(product);
};