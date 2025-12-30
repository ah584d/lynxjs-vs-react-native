import type { ReactElement } from '@lynx-js/react';
import { useLocation } from 'react-router';
import { PageView } from '@/components/index.js';
import styles from './movieDetails.module.scss';

export function MovieDetails(): ReactElement {
  const location = useLocation();
  const movieData = location.state?.movie;

  return (
    <PageView isBack title='Movie Details'>
      <view className={styles['body']}>
        <scroll-view className={styles['scroll-container']} scroll-orientation='vertical'>
          <image src={`https://image.tmdb.org/t/p/w342${movieData.poster_path || movieData.poster_path}`} className={styles['picture']} />
          <view className={styles['content-padding']}>
            <text className={styles['title']}>{movieData.title}</text>
            <text className={styles['sub-title']}>{movieData.description}</text>
            <text className={styles['rating-container']}>
              <text className={styles['sub-title']}>Rating:</text>
              <text className={styles['sub-title-yellow']}> ★</text>
              <text className={styles['sub-title']}> {movieData.vote_average.toFixed(1)}/10</text>
            </text>
            <text className={styles['sub-title']}>Release Date: {movieData.release_date}</text>
            <text className={styles['sub-title']}>Overview:</text>
            <text className={styles['description']}>{movieData.overview}</text>
          </view>
        </scroll-view>
      </view>
    </PageView>
  );
}
