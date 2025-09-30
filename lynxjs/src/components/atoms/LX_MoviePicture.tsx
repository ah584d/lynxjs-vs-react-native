import { useState } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';
import './moviePicture.css';

interface MoviePictureProps {
  posterUrl: string;
}

export const MoviePicture = ({ posterUrl }: MoviePictureProps): ReactNode => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imageError) {
    return (
      <view className='movie-picture-container'>
        <view className='error-container'>
          <text className='error-text'>Oops!!</text>
          <text className='error-icon'>😢</text>
          <text className='error-text'>something went wrong</text>
        </view>
      </view>
    );
  }

  return (
    <view className='movie-picture-container'>
      <view className={`shimmer-container${!isLoading ? ' hidden' : ''}`}>
        <view className='shimmer-base' />
        <view className='shimmer-overlay' />
        <view className='shimmer-glow' />
      </view>
      <image src={posterUrl} className={`movie-poster${isLoading ? ' loading' : ''}`} bindload={handleImageLoad} binderror={handleImageError} />
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
