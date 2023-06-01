import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.get('/most_vote', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .createQueryBuilder('movie') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .where('movie.Vote_count > 100')
    //.andWhere("(photo.name = :photoName OR photo.name = :bearName)")
    .orderBy('movie.Vote_average', 'DESC')
    .take(100)
    //.setParameters({ photoName: "My", bearName: "Mishka" })
    .getMany()
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.post('/new', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    id: req.body.id,
    Title: req.body.Title,
    Date: req.body.Date,
    Overview: req.body.Overview,
    Poster_path: req.body.Path,
    Vote_average: req.body.Vavg,
    Vote_count: req.body.Vcount,
    Popularity: req.body.Popularity,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with title "${newMovie.Title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Movie' });
      }
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the Movie' });
    });
});

export default router;
