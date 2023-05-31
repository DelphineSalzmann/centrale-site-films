import logo from './logo.svg';
import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Movie from '../../components/Movie/Movie';
import StarRating from '../../components/StarRating/StarRating';

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
  //teste si str2 est compris dans str1
  let comp1 = '';
  let comp2 = '';
  comp1 = str1.toLowerCase();
  comp2 = str2.toLowerCase();

  return comp1.includes(comp2);
}

function FilterMovies(string, movies_arr) {
  // retourne la liste des films dont le titre contient string
  const filtered = movies_arr.filter((movie) =>
    includestring(movie.original_title, string)
  );

  return filtered;
}

function Home() {
  const [movieName, setmovieName] = useState('');
  const movies = useFetchMovies();
  const slides = [
    { url: img1, title: 'titre' },
    { url: img2, title: 'titre' },
    { url: img3, title: 'titre' },
  ];
  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto',
  };
  let listItems = null;
  if (FilterMovies(movieName, movies).length > 0) {
    listItems = FilterMovies(movieName, movies).map((movie) => (
      // liste des films filtrée par rapport à l'input. On la parcours pour obtenir les titres et les images et toute autre donnée définie dans Movie
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
      <div style={containerStyles}>
        <ImageSlider slides={slides}></ImageSlider>
      </div>

      <div>
        <StarRating stars={stars}></StarRating>
      </div>

      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          The movie you are searching contains " {movieName.toLowerCase()} " .
        </p>

        <input
          type="text"
          placeholder="Movie Name"
          id="movie"
          onChange={(event) => setmovieName(event.target.value)}
          // on attribue à movieName ce que l'utilisateur entre en input
        ></input>
        <br></br>

        <p>
          <ul class="flex-container">{listItems}</ul>{' '}
        </p>

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
