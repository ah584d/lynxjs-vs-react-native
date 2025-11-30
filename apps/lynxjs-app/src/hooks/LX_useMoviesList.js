import { useCallback, useEffect, useRef, useState } from '@lynx-js/react';
import { IMDB_CHUNK_SIZE } from '@/common/LX_constants.js';
import { useMovieStore } from './LX_useMovieStore.js';
export function useMoviesList(currentPage, yearFilter, genreFilter, forceRefresh) {
    const getMovies = useMovieStore(state => state.getMovies);
    const error = useMovieStore(state => state.error);
    const moviesList = useMovieStore(state => state.moviesList);
    const [previousMoviesLength, setPreviousMoviesLength] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);
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
        }
        else {
            setHasMoreData(true);
        }
    }, [error, moviesList, previousMoviesLength, currentPage]);
    return [!!error, hasMoreData];
}
export function useScrollAnimation() {
    const [isScrolling, setIsScrolling] = useState(false);
    const timeoutRef = useRef(null);
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
