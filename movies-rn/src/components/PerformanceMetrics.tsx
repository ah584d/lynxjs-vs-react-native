import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { usePerformanceStore } from '@fennex-sand/hooks';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';

interface PerformanceMetricsProps {
  customStyle?: ViewStyle;
}

export function PerformanceMetrics({ customStyle }: PerformanceMetricsProps) {
  const { metrics } = usePerformanceMonitor();
  const { isHeavyComputationActive, toggleHeavyComputation } = usePerformanceStore();
  const style = useThemedStyles(styles.light, styles.dark);

  const formatMemory = (mb: number) => `${mb.toFixed(1)} MB`;
  const formatTime = (ms: number) => `${ms.toFixed(2)} ms`;

  const MetricCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
    <View style={style.metricCard}>
      <Text style={style.metricTitle}>{title}</Text>
      <Text style={style.metricValue}>{value}</Text>
      <Text style={style.metricDescription}>{description}</Text>
    </View>
  );

  return (
    <View style={[style.container, customStyle]}>
      <TouchableOpacity
        style={[style.toggleButton, isHeavyComputationActive && style.toggleButtonActive]}
        onPress={toggleHeavyComputation}>
        <Text style={[style.toggleButtonText, isHeavyComputationActive && style.toggleButtonTextActive]}>
          {isHeavyComputationActive ? '🔥 Heavy Computation ON' : '💤 Heavy Computation OFF'}
        </Text>
        <Text style={style.toggleDescription}>{isHeavyComputationActive ? 'Tap to stop UI slowdown' : 'Tap to start 1M element loop'}</Text>
      </TouchableOpacity>

      <View style={style.metricsGrid}>
        <MetricCard title='⚡ Startup Time' value={formatTime(metrics.startupTime)} description='Time to first render' />
        <MetricCard title='🧠 Memory Usage' value={formatMemory(metrics.memoryUsage)} description='Estimated RAM usage' />
        <MetricCard title='📊 Frame Rate' value={`${metrics.fps} FPS`} description='Current animation frames' />
        <MetricCard title='🎨 Render Time' value={formatTime(metrics.renderTime)} description='Last component render' />
        <MetricCard title='📦 Bundle Size' value={metrics.bundleSize} description='App bundle size' />
      </View>
    </View>
  );
}

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    toggleButton: {
      backgroundColor: colors.white,
      borderRadius: 12,
      marginBottom: 24,
      borderWidth: 2,
      borderColor: colors.grayBorder,
      alignItems: 'center',
      height: 80,
      justifyContent: 'center',
    },
    toggleButtonActive: {
      backgroundColor: colors.lightGreen,
      borderColor: colors.green,
    },
    toggleButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.black,
      marginVertical: 6,
    },
    toggleButtonTextActive: {
      color: colors.green,
    },
    toggleDescription: {
      fontSize: 12,
      color: colors.darkGray,
      textAlign: 'center',
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    metricCard: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      width: '48%',
      borderWidth: 1,
      borderColor: colors.grayBorder,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    metricTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.darkGray,
      marginBottom: 8,
    },
    metricValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.green,
      marginBottom: 4,
    },
    metricDescription: {
      fontSize: 12,
      color: colors.darkGray,
      opacity: 0.8,
    },
  }),
);
