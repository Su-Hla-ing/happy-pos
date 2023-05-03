import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// @ts-ignore
export const checkauth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const accessToken = authHeader && authHeader.split(" ")[1];
  console.log(accessToken);
  if (!accessToken) return res.sendStatus(401);
  try {
    jwt.verify(accessToken, config.jwtSecret);
    console.log("verify is here....");
    next();
  } catch (error) {
    console.log("Verify error is ", error);
  }
};
