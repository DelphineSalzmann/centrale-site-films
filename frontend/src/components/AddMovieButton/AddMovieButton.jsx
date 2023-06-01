import { useState } from 'react';
import axios from 'axios';
import './AddMovieButton.css';

const DEFAULT_FORM_VALUES = {
  id: null,
  title: '',
  release_date: '',
  overview: '',
  poster_path: '',
  vote_average: null,
  vote_count: null,
  popularity: null,
  genre_ids: '',
};

function FormOfMovie(movie) {
  const outputForm = {};
  outputForm['id'] = movie['id'];
  outputForm['Title'] = movie['title'];
  outputForm['Date'] = movie['release_date'];
  outputForm['Overview'] = movie['overview'];
  outputForm['Path'] = movie['poster_path'];
  outputForm['Vavg'] = movie['vote_average'];
  outputForm['Vcount'] = movie['vote_count'];
  outputForm['Popularity'] = movie['popularity'];
  outputForm['Genre'] = movie['genre_ids'].toString();

  return outputForm;
}

function AddMovieButton({ onSuccessfulMovieCreation }) {
  const [MovieCreationError, setMovieCreationError] = useState(null);
  const [MovieCreationSuccess, setMovieCreationSuccess] = useState(null);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(10);

  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = async (event) => {
    event.preventDefault();
    setMovieCreationError(null);
    let movies = [];

    for (let PageNum = startPage; PageNum < endPage; PageNum++) {
      let str = '';
      str =
        'https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&page=';
      str = str.concat(PageNum.toString());
      console.log(str);
      try {
        const response = await axios.get(str);
        // Do something if call succeeded
        let array = response.data.results;
        array = response.data.results;
        console.log('In axios', array);
        movies = [...movies, ...array];
      } catch (error) {
        console.log(error);
      }

      for (const ind in movies) {
        const movieForm = FormOfMovie(movies[ind]);

        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, movieForm)
          .then(() => {
            displayCreationSuccessMessage();
            onSuccessfulMovieCreation();
          })
          .catch((error) => {
            setMovieCreationError('An error occured while creating new movie.');
            console.error(error);
          });
      }
    }
  };

  return (
    <div>
      <button onClick={saveMovie} className='addMovie-button'> Add Movie </button>
    </div>
  );
}

export default AddMovieButton;
