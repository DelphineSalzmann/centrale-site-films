import typeorm from 'typeorm';

const User_rating = new typeorm.EntitySchema({
  name: 'User_rating',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    movie_id: {
      type: Number,
    },
    user_id: {
      type: Number,
    },
    rating: {
      type: Number,
    },
  },
});

export default User_rating;
