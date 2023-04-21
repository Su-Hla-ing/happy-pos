import express, { Request, Response } from "express";
import cors from "cors";
import { pool } from "./db/db";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.post("/menus", async (req: Request, res: Response) => {
  const menusName = req.body.name;
  const menusPrice = req.body.price;
  const text = "INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *";
  const values = [menusName, menusPrice];
  const result = await pool.query(text, values);
  console.log(result.rows);
  res.send(result.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
