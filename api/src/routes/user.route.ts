import express from 'express';

import * as userController from '../controllers/user.controller';
import { catchAsync } from '../helpers/catchAsync';

export const userRouter = express.Router();

userRouter.get('/', userController.get);
userRouter.get('/me', catchAsync(userController.getCurrent));
