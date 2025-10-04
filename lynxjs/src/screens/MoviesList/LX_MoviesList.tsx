import { type ReactElement, useEffect, useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { GENRE_MAP } from '@/common/LX_constants.js';
import { MovieCard } from '@/components/MovieCard/LX_MovieCard.jsx';
import { PageView } from '@/components/index.js';
import { useMovieStore } from '@/hooks/LX_useMovieStore.js';
import { t } from '@/i18n/i18n.js';
import { fetchMovies } from '@/services/LX_http.service.js';
import { getUniqueMoviesById } from '@/services/LX_utils.js';
import type { Movie } from '@/types/LX_common.types.js';
import './moviesList.css';

export function MoviesList(): ReactElement {
  const [firstLoad, setFirstLoad] = useState(true);
  const [filterChanged, setFilterChanged] = useState(false);

  const [hasMoreData, setHadMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const [genreFilter, setGenreFilter] = useState<number | null>(null);
  const [yearFilter, setYearFilter] = useState('2025');
  const [isOffline, setIsOffline] = useState(false);
  const navigate = useNavigate();

  const getMovies = useMovieStore(state => state.getMovies);
  const moviesList = useMovieStore(state => state.moviesList);
  const isLoading = useMovieStore(state => state.isLoading);
  const error = useMovieStore(state => state.error);


  // useEffect(() => {
  //   getMovies(currentPage, yearFilter, genreFilter);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getMovies, currentPage]);

  useEffect(() => {
    handleGetMovies();
  }, []);



  const handleActionGenre = (_type: number | null) => () => {
    if (_type !== genreFilter) {
      setFilterChanged(true);
    }
    setGenreFilter(_type);
  };

  const handleActionYear = (_year: string) => () => {
    if (_year !== yearFilter) {
      setFilterChanged(true);
    }
    setYearFilter(_year);
  };

  const goToPerformance = () => {
    navigate('/performance');
  };

  async function handleGetMovies(): Promise<void> {
    setIsOffline(false);
    setFilterChanged(false);
    setCurrentPage(1);

    console.log('====> DEBUG handleGetMovies: page: ', currentPage, 'firstLoad:', firstLoad);

    setLoading(true);
    const [freshMovies, error] = await fetchMovies(1, yearFilter, genreFilter);
    setLoading(false);

    if (error) {
      setIsOffline(true);
      return;
    }

    if (freshMovies?.length === 0) {
      setDisplayedMovies([]);
      return;
    }

    const uniqueMovies = getUniqueMoviesById(freshMovies ?? []);
    setDisplayedMovies(uniqueMovies);
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
                <text className='Title'>{displayedMovies.length}</text>
              </view>
            </view>
            <view className='FilterSection'>
              <text className='FilterLabel'>{`${t('genre')}: ${(genreFilter && GENRE_MAP?.[genreFilter]) || t('all')}`}</text>
              <view className='FilterOptions'>
                <RenderGenreFilters />
              </view>
            </view>

            <view className='FilterSection'>
              <text className='FilterLabel'>{`${t('year')}: ${yearFilter}`}</text>
              <view className='FilterOptionsYear'>
                <RenderYearsFilters />
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
              bindscrolltolower={addDataToLower}>
              {displayedMovies.map((movie, index) => (
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

          <view class={`recommend-button${!filterChanged ? ' recommend-button-disabled' : ''}`} bindtap={handleGetMovies}>
            <text class={`button-text${!filterChanged ? ' button-text-disabled' : ''}`}>{loading ? 'Loading...' : t('get_movies')}</text>
          </view>
        </view>
      </view>
    </PageView>
  );

  async function addDataToLower(): Promise<void> {
    // there is a bug in bindscrolltolower, addDataToLower is called anyway on page loading, so we want to avoid incrementing the counter on the first call
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      setCurrentPage(prev => prev + 1);
    }
    console.log('====> DEBUG addDataToLower: page: ', currentPage, 'firstLoad:', firstLoad);
    setLoading(true);
    const [freshMovies, error] = await fetchMovies(currentPage + 1, yearFilter, genreFilter);
    setLoading(false);

    if (error) {
      setIsOffline(true);
      return;
    }
    if (freshMovies?.length ?? 0 > 0) {
      const uniqueMovies = getUniqueMoviesById(freshMovies ?? []);
      setDisplayedMovies(prev => [...prev, ...uniqueMovies]);

      if (freshMovies?.length ?? 0 < 20) {
        setHadMoreData(false);
      }
    }
  }

  function RenderYearsFilters(): ReactElement {
    return (
      <>
        {Array(4)
          .fill(0)
          .map((_, i) => {
            const _keyItem = `${2000 + (i + 22)}`;
            return (
              <view key={i} className={yearFilter == _keyItem ? 'FilterButtonYearActive' : 'FilterButtonYear'} bindtap={handleActionYear(_keyItem)}>
                <text>{_keyItem}</text>
              </view>
            );
          })}
      </>
    );
  }

  function RenderGenreFilters(): ReactElement {
    return (
      <>
        <view className={genreFilter == null ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(null)}>
          <text>{t('all')}</text>
        </view>
        <view className={genreFilter == 28 ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(28)}>
          <text>{t('action')}</text>
        </view>
        <view className={genreFilter == 35 ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(35)}>
          <text>{t('comedy')}</text>
        </view>
        <view className={genreFilter == 18 ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(18)}>
          <text>{t('drama')}</text>
        </view>
      </>
    );
  }
}
