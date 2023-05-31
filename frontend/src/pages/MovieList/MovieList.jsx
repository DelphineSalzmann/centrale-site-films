import './MovieList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MoviesTable from '../../components/MoviesTable/MoviesTable';
import AddMovieButton from '../../components/AddMovieButton/AddMovieButton';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = () => {
    setMoviesLoadingError(null);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
  };

  // fetch movie on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="Movies-container">
      <h1>This page displays the movies</h1>

      <p>Click this button to add the most popular movies to the database</p>
      <AddMovieButton onSuccessfulMovieCreation={fetchMovies}></AddMovieButton>

      <p>Or add movie based on information</p>
      <AddMovieForm onSuccessfulMovieCreation={fetchMovies} />

      <MoviesTable movies={movies} onSuccessfulMovieDeletion={fetchMovies} />
      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default Movies;
