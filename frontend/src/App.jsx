import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Movies from './pages/MovieList/MovieList';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="movies" element={<Movies />} />
      </Routes>
    </Layout>
  );
}

export default App;
