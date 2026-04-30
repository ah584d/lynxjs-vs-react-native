import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from './components/ThemeProvider/LX_ThemeProvider';
import { HomeScreen } from './screens/HomeScreen/LX_HomeScreen.jsx';
import { MovieDetails } from './screens/MovieDetails/LX_MovieDetails.jsx';

export function App() {
  return (
    <ThemeProvider>
      <MemoryRouter>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}
