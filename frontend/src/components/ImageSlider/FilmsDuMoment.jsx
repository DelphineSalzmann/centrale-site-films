import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { slice } from 'lodash';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Movie from '../../components/Movie/Movie';

function useFetchRecents() {
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
      )
      .then((response) => {
        // Do something if call succeeded
        let array = response.data.results;
        array = response.data.results;
        setRecents(array);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, []);

  return recents;
}

const slides=()=>{
  recents=useFetchRecents()
  useFetchRecents.slice(0, 10).map((recent) => (
    let img_path = '';
    img_path = 'https://image.tmdb.org/t/p/original';
    img_path = img_path.concat(recent.Poster_path);
      ))
      return(
        
      )
  
}



  




// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));