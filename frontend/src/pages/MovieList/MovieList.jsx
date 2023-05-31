import './MovieList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MoviesTable from '../../components/MoviesTable/MoviesTable';
import AddMovieButton from '../../components/AddMovieButton/AddMovieButton';

function Movies() {
  console.log('Avant déclaration de movies');
  const [movies, setMovies] = useState([]);
  console.log('Après déclaration de movies', movies);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  const fetchMovies = () => {
    console.log('Dans Fetch Movies');
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
    console.log('Fin de FetchMovies, movies = ', movies);
  };

  // fetch movie on component mount
  useEffect(() => {
    console.log('Use effect');
    fetchMovies();
    console.log('Fin use effect, movies = ', movies);
  }, []);

  console.log('Fin déclaration, movies = ', movies);

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
