import { type ReactElement } from '@lynx-js/react';
import classNames from 'classnames';
import { PageView } from '@/components/index.js';
import { usePerformanceMonitor } from '@/hooks/LX_usePerformanceMonitor.js';
import { usePerformanceStore } from '@/hooks/LX_usePerformanceStore.js';
import styles from './performanceMetrics.module.scss';

export function Performance(): ReactElement {
  const { metrics } = usePerformanceMonitor();
  const { isHeavyComputationActive, toggleHeavyComputation } = usePerformanceStore();

  const formatMemory = (mb: number) => `${mb.toFixed(1)} MB`;
  const formatTime = (ms: number) => `${ms.toFixed(2)} ms`;

  return (
    <view className={styles['performance-container']}>
      <view className={classNames(styles['toggle-button'], { [styles['toggle-button-active']]: isHeavyComputationActive })} bindtap={toggleHeavyComputation}>
        <text className={classNames(styles['toggle-button-text'], { [styles['toggle-button-text-active']]: isHeavyComputationActive })}>
          {isHeavyComputationActive ? '🔥 Heavy Computation ON' : '💤 Heavy Computation OFF'}
        </text>
        <text className={styles['toggle-description']}>{isHeavyComputationActive ? 'Tap to stop UI slowdown' : 'Tap to start 1M element loop'}</text>
      </view>

      <view className={styles['metrics-grid']}>
        {/* Startup Performance */}
        <view className={styles['metric-card']}>
          <text className={styles['metric-title']}>⚡ Startup Time</text>
          <text className={styles['metric-value']}>{formatTime(metrics.startupTime)}</text>
          <text className={styles['metric-description']}>Time to first render</text>
        </view>

        {/* Memory Usage */}
        <view className={styles['metric-card']}>
          <text className={styles['metric-title']}>🧠 Memory Usage</text>
          <text className={styles['metric-value']}>{formatMemory(metrics.memoryUsage)}</text>
          <text className={styles['metric-description']}>Estimated RAM usage</text>
        </view>

        {/* FPS */}
        <view className={styles['metric-card']}>
          <text className={styles['metric-title']}>📊 Frame Rate</text>
          <text className={styles['metric-value']}>{metrics.fps} FPS</text>
          <text className={styles['metric-description']}>Current animation frames</text>
        </view>

        {/* Render Time */}
        <view className={styles['metric-card']}>
          <text className={styles['metric-title']}>🎨 Render Time</text>
          <text className={styles['metric-value']}>{formatTime(metrics.renderTime)}</text>
          <text className={styles['metric-description']}>Last component render</text>
        </view>

        {/* Bundle Size */}
        <view className={styles['metric-card']}>
          <text className={styles['metric-title']}>📦 Bundle Size</text>
          <text className={styles['metric-value']}>{metrics.bundleSize}</text>
          <text className={styles['metric-description']}>App bundle size</text>
        </view>

        {/* Platform Info */}
        {/* <view className={styles['metric-card']}>
            <text className={styles['metric-title']}>🏗️ Platform</text>
            <text className={styles['metric-value']}>LynxJS</text>
            <text className={styles['metric-description']}>Framework type</text>
          </view> */}
      </view>
    </view>
  );
}
