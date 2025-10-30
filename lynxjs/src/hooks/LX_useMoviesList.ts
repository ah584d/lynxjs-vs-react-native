import { useEffect, useState } from '@lynx-js/react';
import { IMDB_CHUNK_SIZE } from '@/common/LX_constants.js';
import { useMovieStore } from './LX_useMovieStore.js';

export function useMoviesList(currentPage: number, yearFilter: number, genreFilter: number): [boolean, boolean /*, Dispatch<SetStateAction<boolean>>*/] {
  const getMovies = useMovieStore(state => state.getMovies);
  const error = useMovieStore(state => state.error);
  const moviesList = useMovieStore(state => state.moviesList);
  const [hasMoreData, setHadMoreData] = useState(true);
  const [lastFetchLength, setLastFetchLength] = useState(0);
  const [previousMoviesLength, setPreviousMoviesLength] = useState(0);

  useEffect(() => {
    console.log(`====> DEBUG currentPage: `, currentPage);
    setPreviousMoviesLength(moviesList?.length ?? 0);
    getMovies(currentPage, yearFilter, genreFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMovies, currentPage]);

  useEffect(() => {
    const currentLength = moviesList?.length ?? 0;
    const newItemsCount = currentLength - previousMoviesLength;
    setLastFetchLength(newItemsCount);
    
    // Reset hasMoreData when we're on page 1 (indicates a reset/new search)
    if (currentPage === 1) {
      setHadMoreData(true);
      return; // Early return to avoid other logic on reset
    }
    
    // If the last fetch returned fewer items than the chunk size, there's no more data
    if (newItemsCount > 0 && newItemsCount < IMDB_CHUNK_SIZE) {
      setHadMoreData(false);
    }
  }, [error, moviesList, previousMoviesLength, currentPage]);  return [!!error, hasMoreData];
}
