import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";
import render401 from "./render401.js";
import logger from "../services/logger.js";

const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (!authorization) { return render401(res); }

  const token = authorization.split("Bearer ")[1];
  if (!token) { return render401(res); }

  const auth = getAuth();

  let decodedToken;
  let user;

  try {
    decodedToken = await auth.verifyIdToken(token);
    user = await auth.getUser(decodedToken.uid);
  } catch (e) {
    logger.error(e);
    return render401(res);
  }

  res.locals.user = user.toJSON();
  res.locals.token = token;
  res.locals.decodedToken = decodedToken;

  next();
};

export default authenticate;
