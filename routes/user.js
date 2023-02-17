import express from 'express';
import { getUser, updateUserInfo } from '../controllers/user.js';
import { validationOfUserUpdate } from '../middlewares/user-joi-validation.js';

const userRouter = express.Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', validationOfUserUpdate, updateUserInfo);

export default userRouter;
