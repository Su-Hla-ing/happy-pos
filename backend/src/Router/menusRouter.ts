import express, { Request, Response } from "express";
import { checkauth } from "../auth/auth";
import { pool } from "../../db/db";
import { menuQueries } from "../queries/menuQueries";
import { fileUpload } from "../libs/fileUpload";
import { config } from "../config/config";
export const menusRouter = express.Router();

menusRouter.get("/:menuId", async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  const menu = await menuQueries.getMenu(menuId);
  res.send(menu);
});

menusRouter.post("/", async (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error: any) => {
      if (error) {
        return res.send(error);
      }
      console.log(req.body.menu);

      // const { name, price }: { name: string; price: number } = JSON.parse(
      //   req.body.menu
      // );
      // const locationIds = JSON.parse(req.body.locationIds);
      const { name, price, locationIds } = JSON.parse(req.body.menu);
      console.log("locationIds", locationIds);

      const [{ originalname }]: any = req.files;
      console.log(originalname);

      const imageUrl = `${config.spaceEndpoint}/happy-pos/su-hlaing/${originalname}`;

      console.log("imageUrl", imageUrl);

      const menus = await menuQueries.createMenu({
        name,
        price,
        locationIds,
        imageUrl,
      });
      console.log("menu..", menus);
      res.sendStatus(200);
      res.send(menus);
    });
  } catch (error) {
    res.sendStatus(500);
  }
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
