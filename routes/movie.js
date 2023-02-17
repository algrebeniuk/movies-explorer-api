import express from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movie';

const movieRouter = express.Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/_id', deleteMovie);
