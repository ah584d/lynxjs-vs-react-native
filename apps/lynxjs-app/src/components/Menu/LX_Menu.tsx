import { type ReactElement } from '@lynx-js/react';
import styles from './menu.module.scss';

export function Menu(): ReactElement {
  return (
    <view className={styles.container}>
      <view className={styles.line} />
      <view className={styles.line} />
      <view className={styles.line} />
    </view>
  );
}
