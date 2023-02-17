import express from 'express';
import { getUser, updateUserInfo } from '../controllers/user';
import { validationOfUserUpdate } from '../middlewares/user-joi-validation';

const userRouter = express.Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', validationOfUserUpdate, updateUserInfo);

export default userRouter;
