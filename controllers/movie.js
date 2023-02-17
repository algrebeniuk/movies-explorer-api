import Movie from '../models/movie';
import BadRequest from '../errors/bad-request';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';

export function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
}

export function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
}

export function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильмы не найдена'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Невозможно удалить чужой фильм'));
      }
      return movie.remove().then(res.send({ message: 'Фильм удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Введены некорректные данные'));
        return;
      }
      next(err);
    });
}
