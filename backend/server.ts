import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import { pool } from "./db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./src/config/config";
import { checkauth } from "./src/auth/auth";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.get("/data", checkauth, async (req: Request, res: Response) => {
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

app.post("/menus", checkauth, async (req: Request, res: Response) => {
  const menusName = req.body.name;
  const menusPrice = req.body.price;
  const text = "INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *";
  const values = [menusName, menusPrice];
  const result = await pool.query(text, values);
  // console.log(result.rows);
  res.send(result.rows);
});

app.put("/menus/:menuId", checkauth, async (req: Request, res: Response) => {
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

app.delete("/menus/:menuId", checkauth, async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  if (!menuId) return res.send("MenuId is required");

  const text = "DELETE FROM menus WHERE id = ($1) RETURNING *";
  const values = [menuId];
  const result = await pool.query(text, values);
  res.send(result.rows);
});

// ===========For Register and Login Form=========

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValidUserInfo =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValidUserInfo)
    return res
      .status(404)
      .send({ err: "Name, email and password are required!" });

  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (result.rows.length) return res.status(401).send("User already exists.");
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
    [name, email, hashPassword]
  );
  // console.log(newUser.rows);
  res.send(newUser.rows);
});

app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isValidUserInfo =
    email && email.length > 0 && password && password.length > 0;
  if (!isValidUserInfo)
    return res.status(404).send({ err: " email and password are required!" });
  const result = await pool.query("SELECT * FROM users WHERE email=$1 ", [
    email,
  ]);
  const isVaildPassword = await bcrypt.compare(
    password,
    result.rows[0].password
  );
  if (!isVaildPassword)
    return res.status(401).send("Bad request. Invalid credentails.");
  const userResult = result.rows[0];
  const user = {
    id: userResult.id,
    name: userResult.name,
    email: userResult.email,
  };
  const accessToken = jwt.sign(user, config.jwtSecret);
  res.send({ accessToken });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
