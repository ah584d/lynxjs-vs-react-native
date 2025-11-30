import { useLocation } from 'react-router';
import { PageView } from '@/components/index.js';
import '../MoviesList/moviesList.css';
import styles from './movieDetails.module.scss';
export function MovieDetails() {
    const location = useLocation();
    const movieData = location.state?.movie;
    return (<PageView isBack title='Movie Detail'>
      <view class='display:flex;flex-direction:column;'>
        <scroll-view style={{ width: 'calc(100% - 10px)', height: '85vh' }} scroll-orientation='vertical'>
          <image src={`https://image.tmdb.org/t/p/w342${movieData.poster_path || movieData.poster_path}`} className={styles['picture']}/>
          <view style='padding:20px'>
            <text className='Title'>{movieData.title}</text>
            <text className={styles['sub-title']}>{movieData.description}</text>
            <text className={styles['sub-title']}>Rating: ★ {movieData.vote_average.toFixed(1)}/10</text>
            <text className={styles['sub-title']}>Release Date: {movieData.release_date}</text>
            <text className={styles['sub-title']}>
              Overview:
              {movieData.overview}
            </text>
          </view>
        </scroll-view>
      </view>
    </PageView>);
}
