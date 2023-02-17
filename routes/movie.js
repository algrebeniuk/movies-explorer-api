import express from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movie';
import { validationOfMovieCreation, validationOfMovieId } from '../middlewares/movie-joi-validation';

const movieRouter = express.Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', validationOfMovieCreation, createMovie);
movieRouter.delete('/_id', validationOfMovieId, deleteMovie);
