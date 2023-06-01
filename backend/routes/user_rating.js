import express from 'express';
import { appDataSource } from '../datasource.js';
import User_rating from '../entities/user_rating.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User_rating)
    .find({})
    .then(function (user_rating) {
      res.json({ users: user_rating });
    });
});

router.post('/new', function (req, res) {
  const user_ratingRepository = appDataSource.getRepository(User_rating);
  const newUser_rating = user_ratingRepository.create({
    movie_id: req.body.movie_id,
    user_id: req.body.user_id,
    rating: req.body.rating,
    genre: req.body.genre,
  });

  user_ratingRepository
    .insert(newUser_rating)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User_rating with title "${newUser_rating.Title}" already exists`,
        });
      } else {
        res
          .status(500)
          .json({ message: 'Error while creating the User_rating' });
      }
    });
});

export default router;
