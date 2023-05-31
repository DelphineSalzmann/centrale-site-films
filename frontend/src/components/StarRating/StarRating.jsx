/*import React, { useState } from 'react';
import Rating from 'react-simple-star-rating';

const StarRating = ({ stars }) => {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };

  return (
    <div className="App">
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={20}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="foo" // Will remove the inline style if applied
      />
      {/* Use rating value */
//      {rating}
//   </div>
// );
//};

//export default StarRating;
import React, { useState } from 'react';
import Rating from 'react-simple-star-rating';
import {FaStar} from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating]=useState(null);
  const [hover, setHover]=useState(null);

  return (<div>
    {[...Array(5)].map((star, i)=>{
      const RatingValue=i+1;                      //on attribue à chaque étoile sa valeur (1à5)
      return (
      <label>
        <input 
        type='radio' 
        name='rating' 
        value={RatingValue} 
        onClick={() => setRating(RatingValue)}>
        </input>
        <FaStar className='star' color={RatingValue > (hover ||rating) ? '#e4e5e9' : '#ffc107'} size={30} onMouseEnter={()=>setHover(RatingValue)}
        onMouseLeave={()=>setHover(null)}/>
      </label>)
    })}

    </div>)
};

export default StarRating;