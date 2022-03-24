import express from "express";
import { validate } from "express-validation";

import * as productController from "../controllers/product.controller";
import * as productValidator from "../validators/product.validator";
import { catchAsync } from "../helpers/catchAsync";
import { validateHasProductCreatorRole, validateHasProductManagerRole, validateProductExists, validateProductModificationRules } from "../middlewares/product.middleware";
import { setUserInRequest } from "../middlewares/custom.middleware";

export const productRouter = express.Router();

productRouter.get(
  "/",
  validate(productValidator.get),
  setUserInRequest,
  catchAsync(productController.get)
);

productRouter.get(
  "/:id",
  validate(productValidator.getById),
  validateProductExists,
  catchAsync(productController.getById)
);

productRouter.post(
  "/",
  validate(productValidator.create),
  validateHasProductCreatorRole,
  catchAsync(productController.add)
);

productRouter.put(
  "/:id",
  validate(productValidator.update),
  validateProductExists,
  validateProductModificationRules,
  catchAsync(productController.update)
);

productRouter.delete(
  "/:id",
  validateProductExists,
  validateHasProductManagerRole,
  catchAsync(productController.remove)
);
