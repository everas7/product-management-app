import { Request, Response, NextFunction } from "express";

import * as userServices from "../services/user.service";
import * as productServices from "../services/product.service";
import httpStatus from "http-status";
import {
  PRODUCT_CREATORS,
  PRODUCT_MANAGERS,
  PRODUCT_PRICING,
  User,
} from "../interfaces/user.interface";

export const validateProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await productServices.getById(parseInt(req.params.id, 10));
  if (!product) {
    res
      .status(httpStatus.NOT_FOUND)
      .send({ message: `Property with id ${req.params.id} does not exist` });
  } else {
    req.product = product;
  }

  next();
};

export const validateHasProductCreatorRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (user.roles.includes(PRODUCT_CREATORS)) {
      next();
      return;
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: "User does not have permission to perform this action" });
};

export const validateHasProductManagerRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (user.roles.includes(PRODUCT_MANAGERS)) {
      next();
      return;
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: "User does not have permission to perform this action" });
};

export const validateHasProductPricingRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (user.roles.includes(PRODUCT_PRICING)) {
      next();
      return;
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: "User does not have permission to perform this action" });
};

export const validateProductModificationRules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userServices.getById((req.user as User)?.id);
  if (user) {
    req.user = user;
    if (req.body.price !== undefined && Object.keys(req.body).length === 1) {
      if (user.roles.includes(PRODUCT_PRICING)) {
        next();
        return;
      }
    } else {
      if (user.roles.includes(PRODUCT_MANAGERS)) {
        next();
        return;
      }
    }
  }
  res
    .status(httpStatus.FORBIDDEN)
    .send({ message: "User does not have permission to perform this action" });
};
