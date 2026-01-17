import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@fennex-sand/constants';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { usePerformanceStore } from '@fennex-sand/hooks';

export default function PerformanceScreen() {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Performance Dashboard</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.black,
    marginBottom: 24,
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.light.grayBorder,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: Colors.light.lightGreen,
    borderColor: Colors.light.green,
  },
  toggleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.black,
    marginBottom: 4,
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
  networkSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.black,
    marginBottom: 16,
  },
  networkList: {
    backgroundColor: Colors.light.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.grayBorder,
    overflow: 'hidden',
  },
  networkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.grayBorder,
  },
  networkUrl: {
    fontSize: 14,
    color: Colors.light.black,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  networkDuration: {
    fontSize: 12,
    color: Colors.light.darkGray,
    marginRight: 8,
  },
  networkStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  networkStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusSuccess: {
    backgroundColor: Colors.light.lightGreen,
  },
  statusSuccessText: {
    color: Colors.light.green,
  },
  statusError: {
    backgroundColor: Colors.light.lightGray,
  },
  statusErrorText: {
    color: Colors.light.purple,
  },
  noData: {
    padding: 20,
    textAlign: 'center',
    color: Colors.light.darkGray,
    fontStyle: 'italic',
  },
});
