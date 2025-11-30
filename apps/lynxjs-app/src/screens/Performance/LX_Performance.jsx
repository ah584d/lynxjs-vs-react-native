import {} from '@lynx-js/react';
import { PageView } from '@/components/index.js';
import { usePerformanceMonitor } from '@/hooks/LX_usePerformanceMonitor.js';
import { usePerformanceStore } from '@/hooks/LX_usePerformanceStore.js';
import './Performance.css';
export function Performance() {
    const { metrics } = usePerformanceMonitor();
    const { isHeavyComputationActive, toggleHeavyComputation } = usePerformanceStore();
    const formatMemory = (mb) => `${mb.toFixed(1)} MB`;
    const formatTime = (ms) => `${ms.toFixed(2)} ms`;
    return (<PageView isBack title='Performance Dashboard'>
      <view className='performance-container'>
        <view className={`ToggleButton ${isHeavyComputationActive ? 'ToggleButtonActive' : ''}`} bindtap={toggleHeavyComputation}>
          <text className={`ToggleButtonText ${isHeavyComputationActive ? 'ToggleButtonTextActive' : ''}`}>
            {isHeavyComputationActive ? '🔥 Heavy Computation ON' : '💤 Heavy Computation OFF'}
          </text>
          <text className='ToggleDescription'>{isHeavyComputationActive ? 'Tap to stop UI slowdown' : 'Tap to start 1M element loop'}</text>
        </view>

        <view className='MetricsGrid'>
          {/* Startup Performance */}
          <view className='MetricCard'>
            <text className='MetricTitle'>⚡ Startup Time</text>
            <text className='MetricValue'>{formatTime(metrics.startupTime)}</text>
            <text className='MetricDescription'>Time to first render</text>
          </view>

          {/* Memory Usage */}
          <view className='MetricCard'>
            <text className='MetricTitle'>🧠 Memory Usage</text>
            <text className='MetricValue'>{formatMemory(metrics.memoryUsage)}</text>
            <text className='MetricDescription'>Estimated RAM usage</text>
          </view>

          {/* FPS */}
          <view className='MetricCard'>
            <text className='MetricTitle'>📊 Frame Rate</text>
            <text className='MetricValue'>{metrics.fps} FPS</text>
            <text className='MetricDescription'>Current animation frames</text>
          </view>

          {/* Render Time */}
          <view className='MetricCard'>
            <text className='MetricTitle'>🎨 Render Time</text>
            <text className='MetricValue'>{formatTime(metrics.renderTime)}</text>
            <text className='MetricDescription'>Last component render</text>
          </view>

          {/* Bundle Size */}
          <view className='MetricCard'>
            <text className='MetricTitle'>📦 Bundle Size</text>
            <text className='MetricValue'>{metrics.bundleSize}</text>
            <text className='MetricDescription'>App bundle size</text>
          </view>

          {/* Platform Info */}
          {/* <view className='MetricCard'>
          <text className='MetricTitle'>🏗️ Platform</text>
          <text className='MetricValue'>LynxJS</text>
          <text className='MetricDescription'>Framework type</text>
        </view> */}
        </view>
      </view>
    </PageView>);
}
