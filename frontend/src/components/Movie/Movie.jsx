import './Movie.css';

function Movie({ movie }) {
  // {"adult","backdrop_path","genre_ids""id","original_language","original_title","overview","popularity","poster_path","release_date","title","video","vote_average","vote_count"}
  let img_path = '';
  img_path = 'https://image.tmdb.org/t/p/original';
  img_path = img_path.concat(movie.poster_path);

  return (
    <div>
      <img src={img_path} alt="logo" />
      <p class="Movie-title">{movie.original_title}</p>
    </div>
  );
}

export default Movie;
