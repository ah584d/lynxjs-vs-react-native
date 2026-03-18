import { type ReactElement } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import styles from './menuCurtain.module.scss';

export function MenuCurtain(): ReactElement {
  const menuOpened = useMovieStore(state => state.menuOpened);

  return <view className={styles.container}>hello</view>;
}
