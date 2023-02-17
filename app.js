import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { requestLogger, errorLogger } from './middlewares/logger';
import auth from './middlewares/auth';
import { login, createUser } from './controllers/user';
import userRouter from './routes/user';
import movieRouter from './routes/movie';
import CentralizedErrorHandling from './middlewares/centralized-error-handling';
import NotFoundError from './errors/not-found-error';

const { PORT = 3001 } = process.env;
const app = express();

set('strictQuery', false);
connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(json());
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', userRouter);
app.use('/movie', movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('File not found'));
});

app.use(errorLogger);
app.use(CentralizedErrorHandling);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
