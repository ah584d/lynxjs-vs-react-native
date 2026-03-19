import { type ReactElement } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import { Hamburger } from '../Hamburger/LX_Hamburger';
import styles from './menuCurtain.module.scss';

export function MenuCurtain(): ReactElement {
  const menuOpened = useMovieStore(state => state.menuOpened);

  return (
    <>
      {menuOpened && (
        <view className={styles.container}>
          <view className={styles.hamburger}>
            <Hamburger />
          </view>
        </view>
      )}
    </>
  );
}
