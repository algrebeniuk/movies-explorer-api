/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';

const userRouter = express.Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUserInfo);

export default userRouter;
