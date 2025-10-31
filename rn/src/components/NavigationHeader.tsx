import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/common/colors';
import { useMovieStore } from '@/hooks/useMovieStore';

export const NavigationHeader = () => {
  const moviesList = useMovieStore(state => state.moviesList);
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Movie with RN/Lynx</Text>
        <TouchableOpacity style={styles.performanceButton} onPress={goToPerformance}>
          <Text style={styles.performanceButtonText}>📊</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>{moviesList.length}</Text>
      </View>
    </SafeAreaView>
  );

  function goToPerformance() {
    router.push({ pathname: '/performance' });
  }
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
    fontSize: 26,
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  performanceButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.light.green,
  },
  performanceButtonText: {
    fontSize: 18,
    color: Colors.light.white,
  },
});
