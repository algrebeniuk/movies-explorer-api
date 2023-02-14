import express, { json } from 'express';
import { set, connect } from 'mongoose';

const { PORT = 3001 } = process.env;
const app = express();

set('strictQuery', false);
connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
