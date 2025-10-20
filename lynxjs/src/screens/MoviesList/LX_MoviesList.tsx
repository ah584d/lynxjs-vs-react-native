import { type ReactElement, useEffect, useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { GENRES_FILTER, GENRE_MAP_, YEARS_FILTER } from '@/common/LX_constants.js';
import { Filter } from '@/components/Filter/LX_Filter.jsx';
import { MovieCard } from '@/components/MovieCard/LX_MovieCard.jsx';
import { PageView } from '@/components/index.js';
import { useMovieStore } from '@/hooks/LX_useMovieStore.js';
import { t } from '@/i18n/i18n.js';
import { fetchMovies_ } from '@/services/LX_http.service.js';
import { getUniqueMoviesById } from '@/services/LX_utils.js';
import type { Movie } from '@/types/LX_common.types.js';
import './moviesList.css';

export function MoviesList(): ReactElement {
  const [firstLoad, setFirstLoad] = useState(true);
  const [filterChanged, setFilterChanged] = useState(false);

  const [hasMoreData, setHadMoreData] = useState(true);

  // const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  // const [loading, setLoading] = useState(false);

  const [genreFilter, setGenreFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false);
  const navigate = useNavigate();

  const getMovies = useMovieStore(state => state.getMovies);
  const resetList = useMovieStore(state => state.resetList);
  const moviesList = useMovieStore(state => state.moviesList);
  const isLoading = useMovieStore(state => state.isLoading);
  const error = useMovieStore(state => state.error);

  useEffect(() => {
    getMovies(currentPage, yearFilter, genreFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMovies, currentPage]);

  // useEffect(() => {
  //   handleGetMovies();
  // }, []);

  if (error) {
    setIsOffline(true);
  }
  const onFilterGenreChange = (activeIndex: number) => () => {
    if (activeIndex !== genreFilter) {
      setFilterChanged(true);
    }
    setGenreFilter(activeIndex);
  };

  const onFilterYearChange = (activeIndex: number) => () => {
    if (activeIndex !== yearFilter) {
      setFilterChanged(true);
    }
    setYearFilter(activeIndex);
  };

  const goToPerformance = () => {
    navigate('/performance');
  };

  async function fetchCleanList(): Promise<void> {
    setFilterChanged(false);
    setIsOffline(false);
    setCurrentPage(1);

    console.log('====> DEBUG fetchCleanList: page: ', currentPage, 'firstLoad:', firstLoad);

    // setLoading(true);
    // const [freshMovies, error] = await fetchMovies(1, yearFilter, genreFilter);
    // setLoading(false);
    await getMovies(1, yearFilter, genreFilter);

    // if (error) {
    //   setIsOffline(true);
    //   return;
    // }

    // if (freshMovies?.length === 0) {
    //   setDisplayedMovies([]);
    //   return;
    // }

    // const uniqueMovies = getUniqueMoviesById(freshMovies ?? []);
    // setDisplayedMovies(uniqueMovies);
  }

  return (
    <PageView>
      <view className='AppContainer'>
        {isOffline && (
          <view className='offline-container'>
            <text className='offline-text'>You are offline. Please check your internet connection.</text>
          </view>
        )}
        <view className='MainContent'>
          <view className='Header'>
            <view style='display:flex;flex-direction:row;align-items:center;justify-content:space-between'>
              <text className='Title'>Movie With Lynx</text>
              <view style='display:flex;flex-direction:row;align-items:center;gap:16px'>
                <view className='performance-button' bindtap={goToPerformance}>
                  <text style='color:white;font-size:16px'>📊</text>
                </view>
                <text className='Title'>{moviesList.length}</text>
              </view>
            </view>
            <view className='FilterSection'>
              <text className='FilterLabel'>{`${t('genre')}: ${genreFilter >= 0 && GENRES_FILTER[genreFilter]}`}</text>
              <view className='FilterOptions'>
                <Filter currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
              </view>
            </view>

            <view className='FilterSection'>
              <text className='FilterLabel'>{`${t('year')}: ${YEARS_FILTER[yearFilter]}`}</text>
              <view className='FilterOptionsYear'>
                <Filter currentSelection={yearFilter} filters={YEARS_FILTER} onFilterChange={onFilterYearChange} />
              </view>
            </view>
          </view>
          <view className='MovieList'>
            <list
              style='display:flex;flex:1;padding-bottom:52px'
              list-type='single'
              span-count={1}
              scroll-orientation='vertical'
              initial-scroll-index={1}
              scroll-event-throttle={16}
              lower-threshold-item-count={1}
              bounces={false}
              bindscrolltolower={/*addDataToLower*/ () => increaseCurrentPage()}>
              {moviesList.map((movie, index) => (
                <MovieCard movie={movie} index={index} />
              ))}
              {hasMoreData ? (
                <list-item item-key='loading' key='loading'>
                  <text className='TitleAlign'>{`Load More Data...`}</text>
                </list-item>
              ) : (
                <list-item item-key='no-more' key='no-more'>
                  <text className='TitleAlign'>{`No More Data`}</text>
                </list-item>
              )}
            </list>
            {/* <view style='align-items:center;justify-content:center;position:absolute;bottom:0;width:100%;padding:4px 0;align-self:center;background-color:white;z-index:2'>
              <text>Exposed nodes:</text>
              <text style={{ color: 'red' }}>{eventLog}</text>
            </view> */}
          </view>

          <view class={`recommend-button${!filterChanged ? ' recommend-button-disabled' : ''}`} bindtap={fetchCleanList}>
            <text class={`button-text${!filterChanged ? ' button-text-disabled' : ''}`}>{isLoading ? 'Loading...' : t('get_movies')}</text>
          </view>
        </view>
      </view>
    </PageView>
  );

  function increaseCurrentPage(): void {
    if (isLoading) {
      return;
    }
    // Note: there is a bug in bindscrolltolower, addDataToLower is called anyway on page loading, so we want to avoid incrementing the counter on the first call
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  }
  // async function addDataToLower(): Promise<void> {
  //   // there is a bug in bindscrolltolower, addDataToLower is called anyway on page loading, so we want to avoid incrementing the counter on the first call
  //   if (firstLoad) {
  //     setFirstLoad(false);
  //   } else {
  //     setCurrentPage(prev => prev + 1);
  //   }
  //   console.log('====> DEBUG addDataToLower: page: ', currentPage, 'firstLoad:', firstLoad);
  //   setLoading(true);
  //   const [freshMovies, error] = await fetchMovies(currentPage + 1, yearFilter, genreFilter);
  //   setLoading(false);

  //   if (error) {
  //     setIsOffline(true);
  //     return;
  //   }
  //   if (freshMovies?.length ?? 0 > 0) {
  //     const uniqueMovies = getUniqueMoviesById(freshMovies ?? []);
  //     setDisplayedMovies(prev => [...prev, ...uniqueMovies]);

  //     if (freshMovies?.length ?? 0 < 20) {
  //       setHadMoreData(false);
  //     }
  //   }
  // }
}
