
import {MemoryRouter, Route, Routes} from 'react-router';

import './App.css';
import {Movie} from './screens/Movie/Movie.jsx';
import {Movies} from './screens/Movies/Movies.jsx';

export function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route index element={<Movies />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </MemoryRouter>
  )
}
