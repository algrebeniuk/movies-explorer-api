import { Router } from 'express';
import { validationOfUserSignUp, validationOfUserSignIn } from '../middlewares/user-joi-validation.js';
import { login, createUser } from '../controllers/user.js';
import auth from '../middlewares/auth.js';
import userRouter from './user.js';
import movieRouter from './movie.js';
import NotFoundError from '../errors/not-found-error.js';

const router = Router();

router.post('/signup', validationOfUserSignUp, createUser);
router.post('/signin', validationOfUserSignIn, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('File not found'));
});

export default router;
