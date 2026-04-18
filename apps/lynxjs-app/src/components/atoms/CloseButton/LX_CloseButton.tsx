import { ReactElement, useState } from 'react';
import classNames from 'classnames';
import closeIconSvg from '@/assets/close-x.png';
import styles from './closeButton.module.scss';

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps): ReactElement => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    onPress();
  };

  return (
    <view className={classNames(styles.container, { [styles.pressed]: isPressed })} bindtouchstart={handleTouchStart} bindtouchend={handleTouchEnd}>
      <image src={closeIconSvg} className={styles.icon} />
    </view>
  );
};
