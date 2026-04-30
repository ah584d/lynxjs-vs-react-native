import { type ReactElement, useEffect, useState } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import classNames from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { IS_ANDROID } from '@/common/LX_constants.js';
import { FiltersSection } from '@/components/Filters/LX_FiltersSection';
import { Hamburger } from '@/components/Hamburger/LX_Hamburger';
import { MenuCurtain } from '@/components/MenuCurtain/LX_MenuCurtain';
import { MovieCard } from '@/components/MovieCard/LX_MovieCard.jsx';
import { ThemeToggle } from '@/components/ThemeToggle/LX_ThemeToggle';
import { EmptySearchResult } from '@/components/atoms/EmptySearchResult/EmptySearchResult';
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
  const [searchText, setSearchText] = useState('');

  const { moviesList, searchResults, isLoading } = useMovieStore(
    useShallow(state => ({
      moviesList: state.moviesList,
      searchResults: state.searchResults,
      isLoading: state.isLoading,
    })),
  );

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

  const hasSearchText = searchText.trim().length > 0;
  const moviesToDisplay = hasSearchText ? searchResults : moviesList;
  const showEmptySearchState = hasSearchText && searchResults.length === 0 && !isLoading;
  const isButtonDisabled = isLoading || (!filterChanged && !hasSearchText);

  const cacheSize = moviesList.length > 0 ? `(${moviesList.length})` : '';

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
              <view className={styles['title']}>
                <text className={classNames(styles['title-text'], styles['title-text-purple'])}>fliX</text>
                <text className={styles['title-text']}>trends</text>
              </view>
              <view className={styles['actions-container']}>
                <ThemeToggle />
                <text className={classNames(styles['title-text'], styles['title-text-fps'])}>{metrics.fps} fps</text>
              </view>
            </view>
            {/* <RenderHeader /> */}
            <FiltersSection
              genreFilter={genreFilter}
              yearFilter={yearFilter}
              searchText={searchText}
              onFilterGenreChange={onFilterGenreChange}
              onFilterYearChange={onFilterYearChange}
              onSearchTextChange={setSearchText}
            />
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
              bindscrolltolower={() => !isLoading && !hasSearchText && increaseCurrentPage()}>
              {moviesToDisplay.map((movie, index) => (
                <MovieCard movie={movie} index={index} isScrolling={isScrolling} />
              ))}
            </list>
            {showEmptySearchState && <EmptySearchResult />}
          </view>

          <view
            className={classNames(styles['recommend-button'], { [styles['recommend-button-disabled']]: isButtonDisabled })}
            bindtap={fetchCleanList}>
            <text className={classNames(styles['button-text'], { [styles['button-text-disabled']]: isButtonDisabled })}>
              {isLoading ? 'Loading...' : t('get_movies') + ` ${cacheSize}`}
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

  function fetchCleanList(): void {
    setFilterChanged(false);
    setCurrentPage(1);
    setForceRefresh(true);
  }

  function RenderHeader(): ReactElement {
    return (
      <view className={styles['header-row']}>
        <Hamburger />
        <MenuCurtain />
        <view className={styles['title']}>
          <text className={classNames(styles['title-text'], styles['title-text-purple'])}>fliX</text>
          <text className={styles['title-text']}>trends</text>
        </view>
        <view className={styles['actions-container']}>
          <text className={classNames(styles['title-text'], styles['title-text-fps'])}>{metrics.fps} fps</text>
        </view>
      </view>
    );
  }
}
