import './env.js';
import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import limiter from './middlewares/rate-limiter.js';
import cors from 'cors';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import auth from './middlewares/auth.js';
import { login, createUser } from './controllers/user.js';
import { validationOfUserSignUp, validationOfUserSignIn } from './middlewares/user-joi-validation.js';
import userRouter from './routes/user.js';
import movieRouter from './routes/movie.js';
import CentralizedErrorHandling from './middlewares/centralized-error-handling.js';
import NotFoundError from './errors/not-found-error.js';

const { PORT = 3002 } = process.env;
const app = express();
app.use(cors());

set('strictQuery', false);
connect('mongodb://127.0.0.1:27017/bitfilsmdb');

app.use(json());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.post('/signup', validationOfUserSignUp, createUser);
app.post('/signin', validationOfUserSignIn, login);

app.use(auth);

app.use('/users', userRouter);
app.use('/movie', movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('File not found'));
});

app.use(errorLogger);
app.use(errors());
app.use(CentralizedErrorHandling);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
