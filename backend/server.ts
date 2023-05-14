import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import { menusRouter } from "./src/Router/menusRouter";
import { menusCategories } from "./src/Router/menusCategories";
import { authRouter } from "./src/Router/authRouter";
import { appRouter } from "./src/Router/appRouter";

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.use("/menus", menusRouter);
app.use("/menus-categories", menusCategories);
app.use("/auth", authRouter);
app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
