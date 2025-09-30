import { type ReactElement } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { getGenreNames } from '@/services/LX_utils.js';
import type { IMovie } from '@/types/LX_common.types.js';
import { MoviePicture } from './LX_MoviePicture.jsx';
import styles from './movieCard.module.scss';

interface MovieCardProps {
  movie: IMovie;
  index: number;
}

export function MovieCard(props: MovieCardProps): ReactElement {
  const { index, movie } = props;
  const navigate = useNavigate();

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
          <text className={styles['item-movie-card-title']}># {index}</text>
        </view>
        <MoviePicture posterUrl={`https://image.tmdb.org/t/p/w342${movie.poster_path || movie.poster_path}`} />
        <view className='MovieInfo'>
          <text className={styles['item-movie-card-title']}>{movie.title}</text>
          <text className={styles['item-movie-card-rating']}>
            ★ {movie.vote_average.toFixed(1)}
            /10
          </text>
          <text className={styles['item-movie-card-overview']}>{movie.overview}</text>
          <text className={styles['item-movie-card-text']}>Release Date: {movie.release_date}</text>
          <text className={styles['item-movie-card-text']}>Genres: {getGenreNames(movie.genre_ids)}</text>
        </view>
      </view>
    </list-item>
  );
}
