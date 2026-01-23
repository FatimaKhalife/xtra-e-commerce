
import { dbPool } from "../config/db.js";

export const Allprojects = async (req, res) => {
    const [results] = await dbPool.query(` Select
        p.id,
        p.title,
        p.subtitle,
        p.client_name,
        p.completed_date,
        p.website,
        p.about_text,
        p.history_text,
        p.skill,
        GROUP_CONCAT(DISTINCT i.image_url) AS images,
        GROUP_CONCAT(DISTINCT t.tag) AS tags 
        FROM projects p
        LEFT JOIN project_images i ON p.id = i.project_id
        LEFT JOIN project_tags t ON p.id = t.project_id 
        GROUP BY p.id;`);

    res.json(results);
}

export const project = async (req, res) => {
    const { id } = req.params;

    const [rows] = await dbPool.query(` Select
        p.id,
        p.title,
        p.subtitle,
        p.client_name,
        p.completed_date,
        p.website,
        p.about_text,
        p.history_text,
        p.skill,
        GROUP_CONCAT(DISTINCT i.image_url) AS images,
        GROUP_CONCAT(DISTINCT t.tag) AS tags 
        FROM projects p
        LEFT JOIN project_images i ON p.id = i.project_id
        LEFT JOIN project_tags t ON p.id = t.project_id 
        where p.id = ?
        GROUP BY p.id;`, [id]);

    if (!rows.length)
        return res.status(404).json({ message: "Project not found" });

    res.json(rows[0]);


}

export const projectNav = async (req, res) => {
  const { id } = req.params;

  const [[prev]] = await dbPool.query(
    `SELECT id, title, subtitle 
     FROM projects 
     WHERE id < ? 
     ORDER BY id DESC 
     LIMIT 1`,
    [id]
  );

  const [[next]] = await dbPool.query(
    `SELECT id, title, subtitle 
     FROM projects 
     WHERE id > ? 
     ORDER BY id ASC 
     LIMIT 1`,
    [id]
  );

  res.json({ prev: prev || null, next: next || null });
};
