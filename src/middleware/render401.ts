import { Response } from "express";
const render401 = (res: Response) => res.status(401).json({ message: "Authentication failed" });
export default render401;
