import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../db/db";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
export const authRouter = express.Router();

// ===========For Register and Login Form=========

// authRouter.post("/register", async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   const isValidUserInfo =
//     name &&
//     name.length > 0 &&
//     email &&
//     email.length > 0 &&
//     password &&
//     password.length > 0;
//   if (!isValidUserInfo)
//     return res
//       .status(404)
//       .send({ err: "Name, email and password are required!" });

//   const companiesResult = await pool.query(
//     "insert into companies (name) values($1) returning *",
//     ["Default company name"]
//   );
//   const companyId: number = companiesResult.rows[0].id;

//   const result = await pool.query("SELECT * FROM users WHERE email=$1", [
//     email,
//   ]);
//   if (result.rows.length) return res.status(401).send("User already exists.");
//   const hashPassword = await bcrypt.hash(password, 10);
//   const newUser = await pool.query(
//     "insert into users (name, email, password, company_id) values($1, $2, $3, $4) returning *",
//     [name, email, hashPassword, companyId]
//   );

//   const locationResult = await pool.query(
//     "insert into locations (name, address, company_id) values($1, $2, $3 ) returning *",
//     ["Default name", "Default address", companyId]
//   );
//   const locationId: number = locationResult.rows[0].id;

//   const menusResult = await pool.query(
//     "insert into menus(name, price) select * from unnest ($1::text[], $2::int[]) returning *",
//     [
//       ["buble-tea", "milk-tea"],
//       [1800, 2300],
//     ]
//   );
//   const menuId1: number = menusResult.rows[0].id;
//   const menuId2: number = menusResult.rows[1].id;

//   await pool.query(
//     "insert into menus_locations(menu_id, location_id, is_available) select * from unnest ($1::int[], $2::int[], $3::boolean[])",
//     [
//       [menuId1, menuId2],
//       [locationId, locationId],
//       [true, false],
//     ]
//   );

//   const menuCategoriesResult = await pool.query(
//     "insert into menus_categories(name) values($1) returning *",
//     ["default menu category1"]["default menu category2"]
//   );
//   const menuCategoriesId1: number = menuCategoriesResult.rows[0].id;
//   const menuCategoriesId2: number = menuCategoriesResult.rows[1].id;

//   await pool.query(
//     `insert into menus_menus_categories (menu_id, menu_categories_id) values(${menuId1}, ${menuCategoriesId1}), (${menuId2}, ${menuCategoriesId2}) returning *`
//   );

//   const addonCategoriesResult = await pool.query(
//     "insert into addons_categories(name, is_required) values('Drink', true), ('Sizes', false) returning *"
//   );
//   const defaultAddonCategoryId1: number = addonCategoriesResult.rows[0].id;
//   const defaultAddonCategoryId2: number = addonCategoriesResult.rows[2].id;

//   await pool.query(
//     `insert into menus_addon_categories (menus_id, addon_categories_id) values (${menuId1}, ${defaultAddonCategoryId1}), (${menuId2}, ${defaultAddonCategoryId2})`
//   );

//   await pool.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}),
//   ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);
//   res.send(newUser.rows);
// });

authRouter.post("/login", async (req: Request, res: Response) => {
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

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) return res.send({ error: "Name and password are required." });
  const result = await pool.query(
    "select * from users where email=$1 and password=$2",
    [email, password]
  );
  if (result.rows.length) res.send({ message: "User already exists." });
  const companiesResult = await pool.query(
    "insert into companies (name) values($1) returning *",
    ["Default companies"]
  );
  const companyId = companiesResult.rows[0].id;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    "insert into users (name, email, password, company_id) values($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, companyId]
  );
  const locationResult = await pool.query(
    "insert into locations (name, address, company_id) values($1, $2, $3) returning *",
    ["Default location", "Default addresss", companyId]
  );
  const locationId = locationResult.rows[0].id;
  const menusResult = await pool.query(
    "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
    [
      ["mote-hinn-kharr", "shan-khout-swell"],
      [500, 1000],
    ]
  );
  const menus = menusResult.rows;
  const defaultMenuId1 = menus[0].id;
  const defaultMenuId2 = menus[1].id;
  await pool.query(
    "insert into menus_locations (menu_id, location_id) select * from unnest ($1::int[], $2::int[])",
    [
      [defaultMenuId1, defaultMenuId2],
      [locationId, locationId],
    ]
  );
  const menuCategoriesResult = await pool.query(
    "insert into menus_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
  );
  const defaultMenuCategories = menuCategoriesResult.rows;
  const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
  const defaultMenuCategoryId2 = defaultMenuCategories[1].id;
  await pool.query(
    `insert into menus_menus_categories (menu_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
  );
  const defaultAddonCategoriesResult = await pool.query(
    "insert into addons_categories (name, is_required) values ('Drinks', true), ('Sizes', false) returning *"
  );
  const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
  const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
  await pool.query(
    `insert into menus_addons_categories (menu_id, addons_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
  );
  await pool.query(`insert into addons (name, price, addons_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), 
  ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);
  res.send(newUser.rows);
});
