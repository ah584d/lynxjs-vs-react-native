import { MemoryRouter, Route, Routes } from 'react-router';
import './App.css';
import { MovieDetails } from './screens/MovieDetails/LX_MovieDetails.jsx';
import { MoviesList } from './screens/MoviesList/LX_MoviesList.jsx';
import { Performance } from './screens/Performance/LX_Performance.jsx';
export function App() {
    return (<MemoryRouter>
      <Routes>
        <Route index element={<MoviesList />}/>
        <Route path='/performance' element={<Performance />}/>
        <Route path='/movie/:id' element={<MovieDetails />}/>
      </Routes>
    </MemoryRouter>);
}
