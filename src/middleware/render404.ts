import { Response } from "express";
const render404 = (res: Response) => {
  res.status(404).json({ message: "Not found" });
};

export default render404;
