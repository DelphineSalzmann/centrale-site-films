import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Movie from '../../components/Movie/Movie';

function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a'
      )
      .then((response) => {
        // Do something if call succeeded
        let array = response.data.results;
        array = response.data.results;
        setMovies(array);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, []);

  return movies;
}

function includestring(str1, str2) {
  let comp1 = '';
  let comp2 = '';
  comp1 = str1.toLowerCase();
  comp2 = str2.toLowerCase();

  return comp1.includes(comp2);
}

function FilterMovies(string, movies_arr) {
  const filtered = movies_arr.filter((movie) =>
    includestring(movie.original_title, string)
  );

  return filtered;
}

function Home() {
  const [movieName, setmovieName] = useState('');
  const movies = useFetchMovies();
  let listItems = null;
  if (FilterMovies(movieName, movies).length > 0) {
    listItems = FilterMovies(movieName, movies).map((movie) => (
      <li class="flex-item" key={movie}>
        <Movie movie={movie}></Movie>
      </li>
    ));
  } else {
    listItems = (
      <li class="flex-item" key={'error'}>
        <p>There are no movies that match</p>
      </li>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The movie you are searching contains " {movieName.toLowerCase()} " .
        </p>

        <input
          type="text"
          placeholder="Movie Name"
          id="movie"
          onChange={(event) => setmovieName(event.target.value)}
        ></input>

        <ul class="flex-container">{listItems}</ul>

        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
