import axios from 'axios';
import './MoviesTable.css';

function MoviesTable({ movies, onSuccessfulMovieDeletion }) {
  console.log('Dans moviesTable', movies);
  const deleteMovie = (movieId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`)
      .then(() => onSuccessfulMovieDeletion());
  };

  return (
    <div>
      <table className="movies-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Date</th>
            <th>Vote_average</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.Title}</td>
              <td>{movie.Date}</td>
              <td>{movie.Vote_average}</td>
              <td>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MoviesTable;
