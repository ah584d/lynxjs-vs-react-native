import { type ReactElement, useState } from '@lynx-js/react';
import styles from './menu.module.scss';

export function Menu(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <view className={`${styles.container} ${isOpen ? styles.open : ''}`} bindtap={handleMenuClick}>
      <view className={`${styles.line} ${styles.topBar} ${isOpen ? styles.topBarOpen : ''}`} />
      <view className={`${styles.line} ${styles.middleBar} ${isOpen ? styles.middleBarOpen : ''}`} />
      <view className={`${styles.line} ${styles.bottomBar} ${isOpen ? styles.bottomBarOpen : ''}`} />
    </view>
  );
}
