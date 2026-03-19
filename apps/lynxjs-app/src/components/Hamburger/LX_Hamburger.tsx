import { type ReactElement } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import classNames from 'classnames';
import styles from './hamburger.module.scss';

export function Hamburger(): ReactElement {
  const setOpenMenu = useMovieStore(state => state.setOpenMenu);
  const menuOpened = useMovieStore(state => state.menuOpened);

  const onMenuPress = () => {
    setOpenMenu(!menuOpened);
  };

  return (
    <view className={styles.container} bindtap={onMenuPress}>
      <view className={classNames(styles.line, styles.topBar, { [styles.topBarOpen]: menuOpened })} />
      <view className={classNames(styles.line, styles.middleBar, { [styles.middleBarOpen]: menuOpened })} />
      <view className={classNames(styles.line, styles.bottomBar, { [styles.bottomBarOpen]: menuOpened })} />
    </view>
  );
}
