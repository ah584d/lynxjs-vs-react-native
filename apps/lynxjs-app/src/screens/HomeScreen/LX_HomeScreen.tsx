import { type ReactElement, useEffect, useState } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import classNames from 'classnames';
import { GENRES_FILTER, IS_ANDROID, YEARS_FILTER } from '@/common/LX_constants.js';
import { Filter } from '@/components/Filter/LX_Filter.jsx';
import { Hamburger } from '@/components/Hamburger/LX_Hamburger';
import { MenuCurtain } from '@/components/MenuCurtain/LX_MenuCurtain';
import { MovieCard } from '@/components/MovieCard/LX_MovieCard.jsx';
import { PageView } from '@/components/index.js';
import { useMoviesList, useScrollAnimation } from '@/hooks/LX_useMoviesList.js';
import { usePerformanceMonitor } from '@/hooks/LX_usePerformanceMonitor.js';
import { t } from '@/i18n/i18n.js';
import styles from './homeScreen.module.scss';

export function HomeScreen(): ReactElement {
  const [firstLoad, setFirstLoad] = useState(true);
  const [filterChanged, setFilterChanged] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [genreFilter, setGenreFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const moviesList = useMovieStore(state => state.moviesList);
  const isLoading = useMovieStore(state => state.isLoading);
  const [isOffline] = useMoviesList(currentPage, yearFilter, genreFilter, forceRefresh);
  const [isScrolling, handleScrollAnimation] = useScrollAnimation();
  const { metrics } = usePerformanceMonitor();

  useEffect(() => {
    if (forceRefresh && !isLoading) {
      setForceRefresh(false);
    }
  }, [forceRefresh, isLoading]);

  const onFilterGenreChange = (activeIndex: number) => () => {
    if (activeIndex !== genreFilter) {
      setFilterChanged(true);
      if (forceRefresh) {
        setForceRefresh(false);
      }
    }
    setGenreFilter(activeIndex);
  };

  const onFilterYearChange = (activeIndex: number) => () => {
    if (activeIndex !== yearFilter) {
      setFilterChanged(true);
      if (forceRefresh) {
        setForceRefresh(false);
      }
    }
    setYearFilter(activeIndex);
  };

  function fetchCleanList(): void {
    setFilterChanged(false);
    setCurrentPage(1);
    setForceRefresh(true);
  }

  return (
    <PageView>
      <view className={styles['main-container-layout']}>
        {isOffline && (
          <view className={styles['offline-container']}>
            <text className={styles['offline-text']}>You are offline. Please check your internet connection.</text>
          </view>
        )}
        <view className={styles['main-content']}>
          <view>
            <view className={styles['header-row']}>
              <Hamburger />
              <MenuCurtain />
              <text className={styles['title']}>Movie with RN/Lynx</text>
              <view className={styles['actions-container']}>
                <text className={styles['title-text']}>{metrics.fps} fps</text>
              </view>
            </view>
            <view class={classNames('movies-count-floating', { 'movies-count-floating-android': IS_ANDROID })}>
              <text className={styles['movies-count-value']}>{Math.abs(moviesList.length).toLocaleString()}</text>
            </view>
            <view className={styles['filter-section']}>
              <view className={styles['filter-options']}>
                <Filter currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
              </view>
            </view>
            <view className={styles['filter-section']}>
              <view className={styles['filter-options-year']}>
                <Filter currentSelection={yearFilter} filters={YEARS_FILTER} onFilterChange={onFilterYearChange} />
              </view>
            </view>
          </view>
          <view className={styles['movie-list']}>
            <list
              className={styles['list-container-style']}
              list-type='single'
              span-count={1}
              scroll-orientation='vertical'
              initial-scroll-index={1}
              scroll-event-throttle={32}
              lower-threshold-item-count={1}
              bounces={false}
              bindscroll={handleScrollAnimation}
              bindscrolltolower={() => !isLoading && increaseCurrentPage()}>
              {moviesList.map((movie, index) => (
                <MovieCard movie={movie} index={index} isScrolling={isScrolling} />
              ))}
            </list>
            {/* <view style='align-items:center;justify-content:center;position:absolute;bottom:0;width:100%;padding:4px 0;align-self:center;background-color:white;z-index:2'>
              <text>Exposed nodes:</text>
              <text style={{ color: 'red' }}>{eventLog}</text>
            </view> */}
          </view>

          <view className={classNames(styles['recommend-button'], { [styles['recommend-button-disabled']]: !filterChanged })} bindtap={fetchCleanList}>
            <text className={classNames(styles['button-text'], { [styles['button-text-disabled']]: !filterChanged })}>
              {isLoading ? 'Loading...' : t('get_movies') + ` ${moviesList.length > 0 ? `(${moviesList.length})` : ''}`}
            </text>
          </view>
        </view>
      </view>
    </PageView>
  );

  function increaseCurrentPage(): void {
    if (isLoading) {
      return;
    }
    // Note: there is a bug in "bindscrolltolower", useMoviesList is called anyway on page loading, so we want to avoid incrementing the counter on the first call
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    setCurrentPage(prev => prev + 1);
  }
}
