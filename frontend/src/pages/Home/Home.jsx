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
//import StarRating from '../../components/StarRating/StarRating';

function numberOfmatches(arr1, arr2) {
  let n = 0;
  let k = 0;
  while (k < arr1.length) {
    let l = 0;
    while (l < arr2.length) {
      if (arr1[k] === arr2[l]) {
        n++;
      }
      l++;
    }
    k++;
  }

  return n;
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
    includestring(movie.Title, string)
  );

  return filtered;
}

function Home() {
  const [movieName, setmovieName] = useState('');
  const [bouton, setBouton] = useState(4);
  const [movies, setMovies] = useState([]);

  function searchchange(value) {
    setmovieName(value);
    setBouton(3);
  }

  const createArrays = async () => {
    let adresse = '';
    let string = `${import.meta.env.VITE_BACKEND_URL}/movies`;
    if (bouton === 4) {
      const ratedMovies = [];
      const toRateMovies = [];
      const seen_movies = {};
      //Generate array of movies rated by the user

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user_rating`
      );
      const array = response.data.users;
      let i = array.length - 1;
      while (i > -1) {
        const user_rating = array[i];

        if (
          user_rating['user_id'] === 42 &&
          seen_movies[user_rating['movie_id']] === undefined
        ) {
          ratedMovies.push(user_rating);
          seen_movies[user_rating['movie_id']] = 1;
        }
        i--;
      }
      console.log('ratedMovies', ratedMovies);

      //Generate array of movies to sort by user recommendation algorithm
      const response_all_movies = await axios.get(string);
      const array_all_movies = response_all_movies.data.movies;
      let indice = 0;
      while (indice < array_all_movies.length) {
        const movie = array_all_movies[indice];
        if (seen_movies[movie['id']] !== 1) {
          const simpler_movie = movie;
          const genre_array = movie['Genre'].split(',');
          simpler_movie['Genre'] = genre_array;
          toRateMovies.push(simpler_movie);
        }
        indice++;
      }

      console.log('toRateMovies', toRateMovies);

      const movieGradeArray = [];
      let k = 0;
      while (k < toRateMovies.length) {
        let l = 0;
        const movie_to_rate = toRateMovies[k];
        console.log('analysing movie', movie_to_rate);
        let score = 0;
        let denominator = 1;
        if (movie_to_rate['Vote_count'] > 100) {
          score = movie_to_rate['Genre'].length * movie_to_rate['Vote_average'];
          denominator = movie_to_rate['Genre'].length;
        }
        console.log('score', score);
        console.log('denominator', denominator);
        while (l < ratedMovies.length) {
          const rated_movie = ratedMovies[l];
          const rated_movie_grade = rated_movie['rating'];
          const rated_movie_genre = rated_movie['genre'].split(',');
          const matching_genres = numberOfmatches(
            rated_movie_genre,
            movie_to_rate['Genre']
          );
          denominator = denominator + matching_genres;
          score = score + matching_genres * rated_movie_grade;
          console.log('score', score);
          console.log('denominator', denominator);
          l++;
        }
        score = score / denominator;
        movieGradeArray.push([score, movie_to_rate]);
        k++;
      }

      const sortedmovieGradeArray = movieGradeArray.sort((a, b) => b[0] - a[0]);
      console.log('sorted movies', sortedmovieGradeArray);
      const films = sortedmovieGradeArray.map(([score, film]) => film);
      const output_films = [];
      let ind = 0;
      while (ind < films.length) {
        const film = films[ind];
        film['Genre'] = film['Genre'].toString();
        output_films.push(film);
        ind++;
      }
      setMovies(output_films);
    } else {
      if (bouton === 1) {
        adresse = `/most_popular`;
      }
      if (bouton === 2) {
        adresse = `/most_vote`;
      }
      if (bouton === 3) {
        adresse = `/search?query=`;
        adresse = adresse.concat(movieName);
      }
      string = string.concat(adresse);

      axios
        .get(string)
        .then((response) => {
          // Do something if call succeeded
          let array = response.data.movies;
          array = response.data.movies;
          setMovies(array);
        })
        .catch((error) => {
          // Do something if call failed
          console.log(error);
        });
    }
  };

  useEffect(() => {
    createArrays();
  }, [bouton, movieName]);

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
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Rechercher 🔎</p>

        <input
          type="text"
          placeholder="Movie Name"
          id="movie"
          onChange={(event) => searchchange(event.target.value)}
          // on attribue à movieName ce que l'utilisateur entre en input
        ></input>
        <button className="recommandation-button" onClick={() => setBouton(2)}>
          Mes recommandations
        </button>
        <button className="popular-button" onClick={() => setBouton(1)}>
          Les plus populaires
        </button>
        <button className="best-rated-button" onClick={() => setBouton(4)}>
          Les mieux notés
        </button>
        <br></br>

        <p>
          <ul class="flex-container">{listItems}</ul>{' '}
        </p>
      </header>
    </div>
  );
}

export default Home;
