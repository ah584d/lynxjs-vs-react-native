import { type ReactElement, useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { GENRES_FILTER, YEARS_FILTER } from '@/common/LX_constants.js';
import { Filter } from '@/components/Filter/LX_Filter.jsx';
import { MovieCard } from '@/components/MovieCard/LX_MovieCard.jsx';
import { PageView } from '@/components/index.js';
import { useMovieStore } from '@/hooks/LX_useMovieStore.js';
import { useMoviesList, useScrollAnimation } from '@/hooks/LX_useMoviesList.js';
import { t } from '@/i18n/i18n.js';
import './moviesList.css';

export function MoviesList(): ReactElement {
  const [firstLoad, setFirstLoad] = useState(true);
  const [filterChanged, setFilterChanged] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [genreFilter, setGenreFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const moviesList = useMovieStore(state => state.moviesList);
  const isLoading = useMovieStore(state => state.isLoading);
  const [isOffline, hasMoreData] = useMoviesList(currentPage, yearFilter, genreFilter, forceRefresh);
  const [isScrolling, setIsScrolling] = useScrollAnimation();

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

  function fetchCleanList(): void {
    console.log('====> DEBUG MoviesList - fetchCleanList: page: ', currentPage, 'firstLoad:', firstLoad, 'forceRefresh:', forceRefresh);
    setFilterChanged(false);
    if (currentPage === 1) {
      setForceRefresh(true);
    }
    setCurrentPage(1);
    setTimeout(() => {
      setForceRefresh(false);
    }, 100);
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
              <text className='Title'>Movie With RN/Lynx</text>
              <view style='display:flex;flex-direction:row;align-items:center;gap:16px'>
                <view className='performance-button' bindtap={goToPerformance}>
                  <text style='color:white;font-size:16px'>📊</text>
                </view>
                <text className='titleText'>{moviesList.length}</text>
              </view>
            </view>
            <view className='filter-section'>
              {/* <text className='FilterLabel'>{`${t('genre')}: ${genreFilter >= 0 && GENRES_FILTER[genreFilter]}`}</text> */}
              <view className='FilterOptions'>
                <Filter currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
              </view>
            </view>

            <view className='filter-section'>
              {/* <text className='FilterLabel'>{`${t('year')}: ${YEARS_FILTER[yearFilter]}`}</text> */}
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
              bindscroll={handleScrollAnimation}
              bindscrolltolower={() => !isLoading && increaseCurrentPage()}>
              {moviesList.map((movie, index) => (
                <MovieCard movie={movie} index={index} isScrolling={isScrolling} />
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
      return;
    }
    setCurrentPage(prev => prev + 1);
  }

  function handleScrollAnimation(): void {
    setIsScrolling(true);
  }
}
