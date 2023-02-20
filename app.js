import './env.js';
import express, { json } from 'express';
import { set, connect } from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import cors from 'cors';
import limiter from './middlewares/rate-limiter.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import CentralizedErrorHandling from './middlewares/centralized-error-handling.js';
import router from './routes/index.js';

const {
  PORT = 3002,
  DB_CONNECTION = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;
const app = express();
app.use(cors());

set('strictQuery', false);
connect(DB_CONNECTION);

app.use(json());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(CentralizedErrorHandling);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
