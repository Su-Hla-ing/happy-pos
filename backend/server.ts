import express, { Request, Response } from "express";
import cors from "cors";
import { pool } from "./db/db";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.get("/data", async (req: Request, res: Response) => {
  const menus = await pool.query("select * from menus");
  const addons = await pool.query("select * from addons");
  const addonsCategories = await pool.query("select * from addons_categories");
  const menusCategories = await pool.query("select * from menus_categories");
  const locations = await pool.query("select * from locations");
  const menuLocations = await pool.query("select * from menus_locations");

  res.send({
    menus: menus.rows,
    addons: addons.rows,
    addonsCategories: addonsCategories.rows,
    menusCategories: menusCategories.rows,
    locations: locations.rows,
    menuLocations: menuLocations.rows,
  });
});

app.post("/menus", async (req: Request, res: Response) => {
  const menusName = req.body.name;
  const menusPrice = req.body.price;
  const text = "INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *";
  const values = [menusName, menusPrice];
  const result = await pool.query(text, values);
  // console.log(result.rows);
  res.send(result.rows);
});

app.put("/menus/:menuId", async (req: Request, res: Response) => {
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
  console.log(result.rows);
  res.send(result.rows);
});

app.delete("/menus/:menuId", async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  if (!menuId) return res.send("MenuId is required");

  const text = "DELETE FROM menus WHERE id = ($1) RETURNING *";
  const values = [menuId];
  const result = await pool.query(text, values);
  res.send(result.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
