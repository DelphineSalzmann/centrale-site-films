//npm install react-icons

import React, { useState } from 'react';
import Rating from 'react-simple-star-rating';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

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
