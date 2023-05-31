import Popup from '../Popup/Popup';
import StarRating from '../StarRating/StarRating';
import './Movie.css';
import { useState } from 'react';

function Movie({ movie }) {
  // {"adult","backdrop_path","genre_ids""id","original_language","original_title","overview","popularity","poster_path","release_date","title","video","vote_average","vote_count"}

  const [buttonPopup, setButtonPopup] = useState(false);
  let img_path = '';
  img_path = 'https://image.tmdb.org/t/p/original';
  img_path = img_path.concat(movie.poster_path);

  const App = () => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
      setIsHover(true);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
    };

    const movieStyle = () => {
      '200px'; //width
      'auto'; //height
      '20px'; //border-radius
      isHover ? 'lightblue' : 'rgb(0, 191, 255)'; //background color
    };
  };

  return (
    <div>
      <button onClick={() => setButtonPopup(true)}><img src={img_path} alt="logo" /></button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}><p>TITRE : {movie.original_title}</p>
      <br></br> <p>DATE DE SORTIE : {movie.release_date}</p>
      <br></br> <p>DESCRIPTION : {movie.overview}</p>
      <p>Note : {movie.vote_average}/10 pour {movie.vote_count} votes</p>
      <p>Noter ce film : </p>
        <StarRating/></Popup>
      <p className="Movie-title">{movie.original_title}</p>
    </div>
  );
}

export default Movie;
