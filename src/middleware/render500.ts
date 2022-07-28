import { Response } from "express";
const render500 = (res: Response) => res.status(500).json({ message: "Internal server error" });
export default render500;
