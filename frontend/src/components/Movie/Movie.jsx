import { useState } from 'react';
import Popup from '../Popup/Popup';
import StarRating from '../StarRating/StarRating';
import './Movie.css';

function Movie({ movie }) {
  // {"adult","backdrop_path","genre_ids""id","original_language","original_title","overview","popularity","poster_path","release_date","title","video","vote_average","vote_count"}
  // {"Title", "Date", "Overview", "Poster_path", "Vote_average", "Vote-count"}

  const [buttonPopup, setButtonPopup] = useState(false);
  let img_path = '';
  img_path = 'https://image.tmdb.org/t/p/original';
  img_path = img_path.concat(movie.Poster_path);

  /*return (
    <div>
      <button onClick={() => setButtonPopup(true)}>
        <img src={img_path} alt="logo" />
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p>TITRE : {movie.Title}</p>
        <br></br> <p>DATE DE SORTIE : {movie.Date}</p>
        <br></br> <p>DESCRIPTION : {movie.Overview}</p>
        <p>
          Note : {movie.Vote_average}/10 pour {movie.Vote_count} votes
        </p>
        <p>Noter ce film : </p>
        <StarRating />
      </Popup>
      <p className="movie-title">{movie.Title}</p>
    </div>
  );*/
  return (
    <div className="movie-card">
      <button onClick={() => setButtonPopup(true)}>
        <img src={img_path} alt="logo" />
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="popup-content">
          <div className="movie-rating">
            <img src={img_path} alt="logo" />
            <p>
              Note : {movie.Vote_average}/10 pour {movie.Vote_count} votes
            </p>
            <p>Noter ce film :</p>
            <StarRating />
          </div>
          <div className="movie-details">
            <p className="section-title">TITRE : {movie.Title}</p>
            <p className="section-title">DATE DE SORTIE : {movie.Date}</p>
            <p className="section-title">DESCRIPTION :</p>
            <p className="section-content">{movie.Overview}</p>
          </div>
        </div>
      </Popup>
      <p className="movie-title">{movie.Title}</p>
    </div>
  );
}

export default Movie;
