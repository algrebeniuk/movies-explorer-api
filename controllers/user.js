/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const { JWT_SECRET } = process.env;

export function getUser(req, res, next) {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(err.message));
        return;
      }
      next(err);
    });
}

export function updateUserInfo(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}
