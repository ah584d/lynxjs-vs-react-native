import { useEffect, useState } from '@lynx-js/react';
import { IMDB_CHUNK_SIZE } from '@/common/LX_constants.js';
import { useMovieStore } from './LX_useMovieStore.js';

export function useMoviesList(currentPage: number, yearFilter: number, genreFilter: number, forceRefresh: boolean): [boolean, boolean] {
  const getMovies = useMovieStore(state => state.getMovies);
  const error = useMovieStore(state => state.error);
  const moviesList = useMovieStore(state => state.moviesList);
  const [previousMoviesLength, setPreviousMoviesLength] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  console.log('====> DEBUG useMoviesList - currentPage: ', currentPage, 'forceRefresh:', forceRefresh);

  useEffect(() => {
    setPreviousMoviesLength(moviesList?.length ?? 0);
    getMovies(currentPage, yearFilter, genreFilter);
  }, [getMovies, currentPage, forceRefresh]);

  useEffect(() => {
    const currentLength = moviesList?.length ?? 0;
    const newItemsCount = currentLength - previousMoviesLength;

    // If the last fetch returned fewer items than the chunk size, there's no more data
    if (newItemsCount > 0 && newItemsCount < IMDB_CHUNK_SIZE) {
      setHasMoreData(false);
    } else {
      setHasMoreData(true);
    }
  }, [error, moviesList, previousMoviesLength, currentPage]);

  return [!!error, hasMoreData];
}

export function useScrollAnimation(): [boolean, (value: boolean) => void] {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    if (isScrolling) {
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    }

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isScrolling, setIsScrolling]);

  return [isScrolling, setIsScrolling];
}
