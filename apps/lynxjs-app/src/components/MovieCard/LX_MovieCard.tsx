import { type ReactElement, memo } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { getGenreNames } from '@/services/LX_utils.js';
import type { Movie } from '@/types/LX_common.types.js';
import { MoviePicture } from '../atoms/LX_MoviePicture.jsx';
import styles from './movieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  index: number;
  isScrolling?: boolean;
}

function MovieCardComponent(props: MovieCardProps): ReactElement {
  const { index, movie, isScrolling = false } = props;
  const navigate = useNavigate();

  const posterClassName = isScrolling ? `${styles['poster-container']} ${styles['poster-scrolling']}` : styles['poster-container'];

  return (
    <list-item item-key={`list-item-${index}`} key={`list-item-${index}`} full-span={true} exposure-id={`list-item-${index}`}>
      <view
        bindtap={() => {
          navigate(`/movie/${movie.id}`, {
            state: { movie },
          });
        }}
        className={`${index % 2 === 0 ? styles['item-movie-card-odd'] : ''} ${styles['item-movie-card-container']}`}>
        <view className={styles['item-movie-card-title-wrapper']}>
          <text className={styles['item-movie-number']}># {index + 1}</text>
        </view>
        <view className={posterClassName}>
          <MoviePicture posterUrl={`https://image.tmdb.org/t/p/w342${movie.poster_path || movie.poster_path}`} />
        </view>
        <view className='MovieInfo'>
          <text className={styles['item-movie-card-title']}>{movie.title}</text>
          <text className={styles['item-movie-card-rating']}>
            ★ {movie.vote_average.toFixed(1)}
            /10
          </text>
          <text className={styles['item-movie-card-overview']}>{movie.overview}</text>
          <text className={styles['item-movie-card-text']}>Release Date3333: {movie.release_date}</text>
          <text className={styles['item-movie-card-text']}>Genres: {getGenreNames(movie.genre_ids)}</text>
        </view>
      </view>
    </list-item>
  );
}

// Memoize the component with custom comparison to ensure isScrolling changes trigger re-renders
export const MovieCard = memo(MovieCardComponent, (prevProps, nextProps) => {
  return prevProps.movie.id === nextProps.movie.id && prevProps.index === nextProps.index && prevProps.isScrolling === nextProps.isScrolling;
});
