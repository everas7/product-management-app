import { Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import { User } from "../interfaces/user.interface";

export const login = async (req: Request, res: Response) => {
  const body = { id: (req.user as User).id, email: (req.user as User).email };
  const accessToken = jwt.sign({ user: body }, String(process.env.JWT_SECRET), {
    expiresIn: "90d",
  });

  res.status(httpStatus.OK).json({
    accessToken,
  });
};
