import typeorm from 'typeorm';

//{"adult","backdrop_path","genre_ids""id","original_language","original_title",
//"overview","popularity","poster_path","release_date","title","video","vote_average",
//"vote_count"}

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    Title: { type: String },
    Date: { type: String },
    Overview: { type: String },
    Poster_path: { type: String },
    Vote_average: { type: Number },
    Vote_count: { type: Number },
  },
});

export default Movie;
