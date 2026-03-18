import { type ReactElement, useState } from '@lynx-js/react';
import classNames from 'classnames';
import styles from './hamburger.module.scss';

export function Hamburger(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <view className={classNames(styles.container, { [styles.open]: isOpen })} bindtap={handleMenuClick}>
      <view className={classNames(styles.line, styles.topBar, { [styles.topBarOpen]: isOpen })} />
      <view className={classNames(styles.line, styles.middleBar, { [styles.middleBarOpen]: isOpen })} />
      <view className={classNames(styles.line, styles.bottomBar, { [styles.bottomBarOpen]: isOpen })} />
    </view>
  );
}
