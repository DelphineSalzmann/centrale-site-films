//npm install react-icons

import React, { useState } from 'react';
import Rating from 'react-simple-star-rating';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useEffect } from 'react';

const StarRating = ({ movieid, genrearr }) => {
  console.log(movieid);
  console.log(genrearr);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    console.log('START');
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user_rating`)
      .then((response) => {
        let array = response.data.users;
        array = response.data.users;
        let i = 0;
        while (i < array.length) {
          console.log(array[i]);
          if (array[i].movie_id === movieid && array[i].user_id === 42) {
            setRating(array[i].rating);
          }
          i++;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log('OKAYYY');
    const form_values = {
      movie_id: null,
      user_id: null,
      rating: null,
      genre: '',
    };
    form_values['movie_id'] = movieid;
    form_values['user_id'] = 42;
    form_values['rating'] = rating;
    form_values['genre'] = genrearr;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user_rating/new`, form_values)
      .catch((error) => {
        console.error(error);
      });
  }, [rating]);

  return (
    <div>
      {[...Array(10)].map((star, i) => {
        const RatingValue = i + 1; //on attribue à chaque étoile sa valeur (1à5)

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={RatingValue}
              onClick={() => setRating(RatingValue)}
            ></input>
            <FaStar
              className="star"
              color={RatingValue > (hover || rating) ? '#e4e5e9' : '#ffc107'}
              size={22}
              onMouseEnter={() => setHover(RatingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
