import Popup from '../Popup/Popup';
import './Movie.css';
import { useState } from 'react';

function Movie({ movie }) {
  // {"adult","backdrop_path","genre_ids""id","original_language","original_title","overview","popularity","poster_path","release_date","title","video","vote_average","vote_count"}
  
  const [buttonPopup, setButtonPopup]=useState(false);
  let img_path = '';
  img_path = 'https://image.tmdb.org/t/p/original';
  img_path = img_path.concat(movie.poster_path);

  return (
    <div>
      <button onClick={() => setButtonPopup(true)}><img src={img_path} alt="logo" /></button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>TITRE : {movie.original_title}
      <br></br> DATE DE SORTIE : {movie.release_date}
      <br></br> DESCRIPTION : {movie.overview}</Popup>
      <p className="Movie-title">{movie.original_title}</p>
    </div>
  );
};

export default Movie;
