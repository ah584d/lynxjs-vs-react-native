import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors } from '@fennex-sand/constants';
import { usePerformanceStore } from '@fennex-sand/hooks';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

interface PerformanceMetricsProps {
  style?: ViewStyle;
}

export function PerformanceMetrics({ style }: PerformanceMetricsProps) {
  const { metrics } = usePerformanceMonitor();
  const { isHeavyComputationActive, toggleHeavyComputation } = usePerformanceStore();

  const formatMemory = (mb: number) => `${mb.toFixed(1)} MB`;
  const formatTime = (ms: number) => `${ms.toFixed(2)} ms`;

  const MetricCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDescription}>{description}</Text>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={[styles.toggleButton, isHeavyComputationActive && styles.toggleButtonActive]} onPress={toggleHeavyComputation}>
        <Text style={[styles.toggleButtonText, isHeavyComputationActive && styles.toggleButtonTextActive]}>
          {isHeavyComputationActive ? '🔥 Heavy Computation ON' : '💤 Heavy Computation OFF'}
        </Text>
        <Text style={styles.toggleDescription}>{isHeavyComputationActive ? 'Tap to stop UI slowdown' : 'Tap to start 1M element loop'}</Text>
      </TouchableOpacity>

      <View style={styles.metricsGrid}>
        <MetricCard title='⚡ Startup Time' value={formatTime(metrics.startupTime)} description='Time to first render' />
        <MetricCard title='🧠 Memory Usage' value={formatMemory(metrics.memoryUsage)} description='Estimated RAM usage' />
        <MetricCard title='📊 Frame Rate' value={`${metrics.fps} FPS`} description='Current animation frames' />
        <MetricCard title='🎨 Render Time' value={formatTime(metrics.renderTime)} description='Last component render' />
        <MetricCard title='📦 Bundle Size' value={metrics.bundleSize} description='App bundle size' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.light.grayBorder,
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: Colors.light.lightGreen,
    borderColor: Colors.light.green,
  },
  toggleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.black,
    marginVertical: 6,
  },
  toggleButtonTextActive: {
    color: Colors.light.green,
  },
  toggleDescription: {
    fontSize: 12,
    color: Colors.light.darkGray,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metricCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.light.grayBorder,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.darkGray,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.green,
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 12,
    color: Colors.light.darkGray,
    opacity: 0.8,
  },
});
