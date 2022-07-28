import { Response } from "express";

const render400 = (res: Response, msg?: string) =>
  res.status(400).json({ message: msg || "Invalid payload" });

export default render400;
