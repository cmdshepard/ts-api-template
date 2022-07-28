import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: "Invalid fields submitted",
      errors: errors.array(),
    });
  }

  next();
};

const validate = (...handlers: ValidationChain[]) => [...handlers, validator];

export default validate;
