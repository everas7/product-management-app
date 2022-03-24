import express from "express";
import { validate } from "express-validation";
import passport from "passport";

import * as authController from "../controllers/auth.controller";
import * as authValidator from "../validators/auth.validator";

export const authRouter = express.Router();

authRouter.post(
  "/login",
  validate(authValidator.login),
  passport.authenticate("login", { session: false }),
  authController.login
);
