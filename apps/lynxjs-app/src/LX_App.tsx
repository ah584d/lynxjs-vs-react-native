import { MemoryRouter, Route, Routes } from 'react-router';
import { MovieDetails } from './screens/MovieDetails/LX_MovieDetails.jsx';
import { HomeScreen } from './screens/HomeScreen/LX_HomeScreen.jsx';
import { Performance } from './screens/Performance/LX_Performance.jsx';

export function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path='/performance' element={<Performance />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </MemoryRouter>
  );
}
