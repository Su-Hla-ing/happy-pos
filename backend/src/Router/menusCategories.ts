import express, { Request, Response } from "express";
import { checkauth } from "../auth/auth";
import { pool } from "../../db/db";
export const menusCategories = express.Router();

menusCategories.post("/", checkauth, async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .send({ error: "Bad request. Please provide menu category name." });
  const text = "INSERT INTO menus_categories(name) VALUES($1) RETURNING *";
  const values = [name];
  const result = await pool.query(text, values);
  // console.log(result.rows);
  res.send(result.rows);
});

menusCategories.delete(
  "/:menuCategoryId",
  checkauth,
  async (req: Request, res: Response) => {
    const menuCategoryId = req.params.menuCategoryId;
    if (!menuCategoryId) return res.send("Menu category id is required.");
    const text = "DELETE FROM menus_categories WHERE id =($1) RETURNING *";
    const values = [menuCategoryId];
    const result = await pool.query(text, values);
    res.send({ menuCategory: result.rows });
  }
);
