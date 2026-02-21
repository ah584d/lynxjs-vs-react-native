import { useCallback, useEffect, useRef, useState } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import { API_KEY, IMDB_CHUNK_SIZE } from '@/common/LX_constants.js';

export function useMoviesList(currentPage: number, yearFilter: number, genreFilter: number, forceRefresh: boolean): [boolean, boolean] {
  const getMovies = useMovieStore(state => state.getMovies);
  const error = useMovieStore(state => state.error);
  const moviesList = useMovieStore(state => state.moviesList);
  const [previousMoviesLength, setPreviousMoviesLength] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    setPreviousMoviesLength(moviesList?.length ?? 0);
    getMovies(API_KEY, currentPage, yearFilter, genreFilter);
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

export function useScrollAnimation(): [boolean, () => void] {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScrollStart = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isScrolling) {
      setIsScrolling(true);
    }

    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      timeoutRef.current = null;
    }, 150);
  }, [isScrolling]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [isScrolling, handleScrollStart];
}
