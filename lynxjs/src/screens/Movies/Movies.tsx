import { useLynxGlobalEventListener, useState } from '@lynx-js/react';
import { type ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { API_KEY, GENRE_MAP, TMDB_BASE_URL } from '@/common/constants.js';
import { PageView } from '@/common/index.js';
import { t } from '@/i18n/i18n.js';
import { fetchMovies } from '@/services/http.service.js';
import type { IMovie } from '@/types/common.types.js';
import './Movies.css';

export function Movies(): ReactElement {
  const [hasMoreData, setHadMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [eventLog, setEventLog] = useState<string>('');
  const navigate = useNavigate();

  const [displayedMovies, setDisplayedMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [useHighestRated, setUseHighestRated] = useState(false);

  useEffect(() => {
    handleGetMovies();
  }, []);

  useLynxGlobalEventListener('exposure', e => {
    (e as { 'exposure-id': string }[]).forEach(item => {
      setEventLog(log => log + (log === '' ? '' : ', ') + item['exposure-id']);
    });
  });

  useLynxGlobalEventListener('disexposure', e => {
    let log = eventLog.split(', ');
    (e as { 'exposure-id': string }[]).forEach(item => {
      log = log.filter(id => id !== item['exposure-id']);
    });
    log.sort();
    setEventLog(log.join(', '));
  });

  return (
    <PageView>
      <view className='AppContainer'>
        <view className='MainContent'>
          <view className='Header'>
            <view style='display:flex;flex-direction:row;align-items:center;justify-content:space-between'>
              <text className='Title'>Movie With Lynx</text>
              {/* <text className='Title'>{displayedMovies.length}</text> */}
            </view>
            <view className='FilterSection'>
              <text className='FilterLabel'>{`${t('genre')}: ${(selectedGenre && GENRE_MAP?.[selectedGenre]) || t('all')}`}</text>
              <view className='FilterOptions'>
                <view className={selectedGenre == null ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(null)}>
                  <text>{t('all')}</text>
                </view>
                <view className={selectedGenre == 28 ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(28)}>
                  <text>{t('action')}</text>
                </view>
                <view className={selectedGenre == 35 ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(35)}>
                  <text>{t('comedy')}</text>
                </view>
                <view className={selectedGenre == 18 ? 'FilterButtonActive' : 'FilterButton'} bindtap={handleActionGenre(18)}>
                  <text>{t('drama')}</text>
                </view>
              </view>
            </view>

            <view className='FilterSection'>
              <text className='FilterLabel'>{`${t('year')}: ${selectedYear}`}</text>
              <view className='FilterOptionsYear'>
                {Array(4)
                  .fill(0)
                  .map((_, i) => {
                    const _keyItem = `${2000 + (i + 22)}`;
                    return (
                      <view key={i} className={selectedYear == _keyItem ? 'FilterButtonYearActive' : 'FilterButtonYear'} bindtap={handleActionYear(_keyItem)}>
                        <text>{_keyItem}s</text>
                      </view>
                    );
                  })}
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
              {displayedMovies.map((movie, index) => {
                return (
                  <list-item item-key={`list-item-${index}`} key={`list-item-${index}`} full-span={true} exposure-id={`list-item-${index}`}>
                    <view
                      bindtap={() => {
                        navigate(`/movie/${movie.id}`, {
                          state: { movie },
                        });
                      }}
                      className={index % 2 === 0 ? 'ItemBgOdd' : ''}
                      style='width:100%;border-bottom:1px solid #ccc'>
                      <view style='display:flex;align-items:center;justify-content:flex-end;padding-right:10px;padding-top:10px'>
                        <text className='MovieTitle'>Index: {index}</text>
                      </view>
                      <view className='PosterContainer'>
                        <image src={`https://image.tmdb.org/t/p/w342${movie.poster_path || movie.poster_path}`} className='MoviePoster' />
                      </view>
                      <view className='MovieInfo'>
                        <text className='MovieTitle'>{movie.title}</text>
                        <text className='MovieRating'>
                          ★ {movie.vote_average.toFixed(1)}
                          /10
                        </text>
                        <text className='MovieOverview'>{movie.overview}</text>
                        <text className='MovieDate'>Release Date: {movie.release_date}</text>
                        <text className='MovieGenres'>Genres: {getGenreNames(movie.genre_ids)}</text>
                      </view>
                    </view>
                  </list-item>
                );
              })}

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

          <view className='RecommendButton' bindtap={handleGetMovies}>
            <text className='ButtonText'>{loading ? 'Loading...' : t('get_movies')}</text>
          </view>
        </view>
      </view>
    </PageView>
  );

  async function addDataToLower() {
    setLoading(true);
    const freshMovies = await fetchMovies(selectedGenre, selectedYear);
    setLoading(false);
    if (freshMovies.length > 0) {
      const uniqueMovies = Array.from(new Set(freshMovies.map((movie: IMovie) => movie.id))).map(id => freshMovies.find((movie: IMovie) => movie.id === id));
      setDisplayedMovies(prev => [...prev, ...uniqueMovies]);
      console.log('uniqueMovies', uniqueMovies, page);

      if (freshMovies.length < 20) {
        setHadMoreData(false);
      }
    }

    setPage(prev => prev + 1);
  }

  async function handleGetMovies() {
    const freshMovies = await fetchMovies(selectedGenre, selectedYear);
    setPage(prev => prev + 1);

    if (freshMovies.length === 0) {
      setDisplayedMovies([]);
      return;
    }

    if (useHighestRated) {
      const sortedMovies = [...freshMovies].sort((a, b) => b.vote_average - a.vote_average);
      setDisplayedMovies(sortedMovies.slice(0, 3));
    } else {
      const uniqueMovies = Array.from(new Set(freshMovies.map((movie: IMovie) => movie.id))).map(id => freshMovies.find((movie: IMovie) => movie.id === id));

      setDisplayedMovies(uniqueMovies);
    }
  }

  function handleActionGenre(_type: number | null) {
    () => {
      console.log(`type: ${_type}`);
      setSelectedGenre(_type);
    };
  }

  function handleActionYear(_year: string) {
    () => {
      console.log(`year: ${_year}`);
      setSelectedYear(_year);
    };
  }

  function handleActionRecommend() {
    setUseHighestRated(prev => !prev);
  }

  function getGenreNames(genreIds: number[]): string {
    if (!genreIds || genreIds.length === 0) return 'Unknown';

    return genreIds.map(id => GENRE_MAP[id] || 'Unknown').join(', ');
  }
}
