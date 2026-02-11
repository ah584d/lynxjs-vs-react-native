import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@fennex-sand/constants';
import { useMovieStore } from '@fennex-sand/hooks';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Hamburger } from './Hamburger';

export const NavigationHeader = () => {
  const moviesList = useMovieStore(state => state.moviesList);
  const { metrics } = usePerformanceMonitor();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Hamburger />
        <Text style={styles.title}>Movie with RN/Lynx</Text>

        <Text style={styles.titleText}>{metrics.fps} fps</Text>
      </View>
      <View style={styles.moviesCountFloating}>
        <Text style={styles.moviesCountValue}>{moviesList.length}</Text>
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
    fontSize: 20,
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  moviesCountFloating: {
    position: 'absolute',
    top: 130,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.green,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  moviesCountLabel: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  moviesCountValue: {
    fontSize: 14,
    color: Colors.light.white,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
});
