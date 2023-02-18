import express from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movie.js';
import { validationOfMovieCreation, validationOfMovieId } from '../middlewares/movie-joi-validation.js';

const movieRouter = express.Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', validationOfMovieCreation, createMovie);
movieRouter.delete('/:movieId', validationOfMovieId, deleteMovie);

export default movieRouter;
