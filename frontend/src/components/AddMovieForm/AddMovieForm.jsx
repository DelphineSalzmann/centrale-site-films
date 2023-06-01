import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

const DEFAULT_FORM_VALUES = {
  id: null,
  Title: '',
  Date: '',
  Overview: '',
  Path: '',
  Vavg: null,
  Vcount: null,
  Popularity: null,
};

function AddMovieForm({ onSuccessfulMovieCreation }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [MovieCreationError, setMovieCreationError] = useState(null);
  const [MovieCreationSuccess, setMovieCreationSuccess] = useState(null);

  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();

    setMovieCreationError(null);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        onSuccessfulMovieCreation();
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error(error);
      });
  };

  return (
    <div>
      <form className="add-movie-form" onSubmit={saveMovie}>
        <input
          className="add-movie-input"
          required
          type="id"
          placeholder="Id from TMDB"
          value={formValues.id}
          onChange={(event) =>
            setFormValues({ ...formValues, id: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Title"
          value={formValues.Title}
          onChange={(event) =>
            setFormValues({ ...formValues, Title: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Date"
          value={formValues.Date}
          onChange={(event) =>
            setFormValues({ ...formValues, Date: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Overview"
          value={formValues.Overview}
          onChange={(event) =>
            setFormValues({ ...formValues, Overview: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Poster_path"
          value={formValues.Path}
          onChange={(event) =>
            setFormValues({ ...formValues, Path: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Vote_average"
          value={formValues.Vavg}
          onChange={(event) =>
            setFormValues({ ...formValues, Vavg: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Vote_count"
          value={formValues.Vcount}
          onChange={(event) =>
            setFormValues({ ...formValues, Vcount: event.target.value })
          }
        />
        <input
          className="add-Movie-input"
          placeholder="Populairty"
          value={formValues.Popularity}
          onChange={(event) =>
            setFormValues({ ...formValues, Popularity: event.target.value })
          }
        />
        <button className="add-Movie-button" type="submit">
          Add Movie
        </button>
      </form>
      {MovieCreationSuccess !== null && (
        <div className="Movie-creation-success">{MovieCreationSuccess}</div>
      )}
      {MovieCreationError !== null && (
        <div className="Movie-creation-error">{MovieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
