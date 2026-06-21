import { type ReactElement } from '@lynx-js/react';
import classNames from 'classnames';
import { Hamburger } from '@/components/Hamburger/LX_Hamburger';
import { ThemeToggle } from '@/components/ThemeToggle/LX_ThemeToggle';
import { usePerformanceMonitor } from '@/hooks/LX_usePerformanceMonitor.js';
import styles from './header.module.scss';

export function Header(): ReactElement {
  const { metrics } = usePerformanceMonitor();

  return (
    <view className={styles['header-row']}>
      <Hamburger />
      <view className={styles['title']}>
        <text className={classNames(styles['title-text'], styles['title-text-purple'])}>fliX</text>
        <text className={styles['title-text']}>trends</text>
      </view>
      <view className={styles['actions-container']}>
        <ThemeToggle />
        <text className={classNames(styles['title-text'], styles['title-text-fps'])}>{metrics.fps} fps</text>
      </view>
    </view>
  );
}
