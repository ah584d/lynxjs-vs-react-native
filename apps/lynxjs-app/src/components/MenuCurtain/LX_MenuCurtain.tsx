import { type ReactElement } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import classNames from 'classnames';
import { Hamburger } from '../Hamburger/LX_Hamburger';
import { Performance } from '../PerformanceMetrics/LX_PerformanceMetrics';
import styles from './menuCurtain.module.scss';

export function MenuCurtain(): ReactElement {
  const menuOpened = useMovieStore(state => state.menuOpened);

  return (
    <view
      className={classNames(styles.container, {
        [styles.open]: menuOpened,
        [styles.closed]: !menuOpened,
      })}>
      <view className={styles.hamburger}>
        <Hamburger />
      </view>
      <Performance />
    </view>
  );
}
