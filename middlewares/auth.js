import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';

const { JWT_SECRET } = process.env;

export default function tokenVerification(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    } else {
      const token = authorization.replace('Bearer ', '');
      payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.name);
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
}
