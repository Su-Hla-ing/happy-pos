import express, { Request, Response } from "express";
import { pool } from "../../db/db";
import { checkauth } from "../auth/auth";
export const appRouter = express.Router();

appRouter.get("/menus", checkauth, async (req: Request, res: Response) => {
  const menus = await pool.query(`select * from menus`);
  const menuCategories = await pool.query("select * from menus_categories");
  const addons = await pool.query("select * from addons");
  const addonCategories = await pool.query("select * from addons_categories");
  const locations = await pool.query("select * from locations");
  const menuLocations = await pool.query("select * from menus_locations");
  res.send({
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    locations: locations.rows,
    menuLocations: menuLocations.rows,
  });
});
