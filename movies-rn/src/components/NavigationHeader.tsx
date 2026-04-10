import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@fennex-sand/constants';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Hamburger } from './Hamburger';

export const NavigationHeader = () => {
  const { metrics } = usePerformanceMonitor();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Hamburger />
        <Text style={styles.title}>
          <Text style={styles.titleText}>fliX</Text>
          <Text style={[styles.titleText, { color: Colors.light.black }]}>trends</Text>
        </Text>
        <Text style={styles.fpsText}>{metrics.fps} fps</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.light.background,
  },
  header: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: Colors.light.purple,
    fontWeight: 'bold',
  },
  fpsText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  moviesCountLabel: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
    marginBottom: 4,
  },
});
