import express, { Request, Response } from "express";
import { checkauth } from "../auth/auth";
import { pool } from "../../db/db";
import { menuQueries } from "../queries/menuQueries";
export const menusRouter = express.Router();

menusRouter.get("/:menuId", async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  const menu = await menuQueries.getMenu(menuId);
  res.send(menu);
});

menusRouter.post("/", checkauth, async (req: Request, res: Response) => {
  const { name, price, locationIds } = req.body;
  const menu = await menuQueries.createMenu({ name, price, locationIds });
  res.send(menu);
});

menusRouter.put("/:menuId", checkauth, async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  if (!menuId) return res.send("MenuId is required");
  const updateMenusName = req.body.name;
  const updateMenusPrice = req.body.price;
  if (!updateMenusName || !updateMenusPrice) {
    return res.send("Please provide at least name or price");
  }
  const text =
    "UPDATE menus SET name = $1, price = $2 WHERE id = ($3) RETURNING *";
  const values = [updateMenusName, updateMenusPrice, menuId];
  const result = await pool.query(text, values);
  res.send(result.rows);
});

menusRouter.delete(
  "/:menuId",
  checkauth,
  async (req: Request, res: Response) => {
    const menuId = req.params.menuId;
    if (!menuId) return res.send("MenuId is required");

    const text = "DELETE FROM menus WHERE id = ($1) RETURNING *";
    const values = [menuId];
    const result = await pool.query(text, values);
    res.send(result.rows);
  }
);
