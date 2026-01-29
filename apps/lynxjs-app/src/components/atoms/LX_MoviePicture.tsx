import { type ReactElement, useState } from '@lynx-js/react';
import styles from './moviePicture.module.scss';

interface MoviePictureProps {
  posterUrl: string;
}

export const MoviePicture = ({ posterUrl }: MoviePictureProps): ReactElement => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imageError) {
    return (
      <view className={styles['movie-picture-container']}>
        <view className={styles['error-container']}>
          <text className={styles['error-text']}>Oops!!</text>
          <text className={styles['error-icon']}>😢</text>
          <text className={styles['error-text']}>something went wrong</text>
        </view>
      </view>
    );
  }

  return (
    <view className={styles['movie-picture-container']}>
      <view className={`${styles['shimmer-container']}${!isLoading ? ' ' + styles['hidden'] : ''}`}>
        <view className={styles['shimmer-base']} />
        <view className={styles['shimmer-overlay']} />
        <view className={styles['shimmer-glow']} />
      </view>
      <image src={posterUrl} className={`${styles['movie-poster']}${isLoading ? ' ' + styles['loading'] : ''}`} bindload={handleImageLoad} binderror={handleImageError} />
    </view>
  );

  function handleImageLoad() {
    setIsLoading(false);
  }

  function handleImageError() {
    setIsLoading(false);
    setImageError(true);
  }
};
