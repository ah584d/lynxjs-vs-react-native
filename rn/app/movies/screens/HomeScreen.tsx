import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/common/colors';
import { useMovieStore } from '@/movies/stores/useMovieStore';
import { Filter } from '../components/Filter';
import { MovieCard } from '../components/MovieCard';

export default function HomeScreen() {
  const [genreFilter, setGenreFilter] = useState<number | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<number | undefined>(3);

  const router = useRouter();

  const fetchPopularMovies = useMovieStore(state => state.fetchPopularMovies);
  const popularMovies = useMovieStore(state => state.popularMovies);

  useEffect(() => {
    fetchPopularMovies();
  }, [genreFilter, yearFilter, fetchPopularMovies]);

  console.log(`====> DEBUG popularMovies: `, popularMovies?.length);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filter}>
          <Filter title='Genre' currentSelection={genreFilter} filters={['Action', 'Comedy', 'Drama']} onFilterChange={onFilterGenreChange} />
        </View>
        <View style={styles.filter}>
          <Filter title='Year' currentSelection={yearFilter} filters={['2022', '2023', '2024', '2025']} onFilterChange={onFilterYearChange} />
        </View>
      </View>
      <View style={styles.body}>
        <FlatList data={popularMovies} renderItem={({ item }) => <MovieCard movie={item} onPress={onMoviePress} />} keyExtractor={item => item.id.toString()} />
      </View>
      <View style={styles.footer}></View>
    </View>
  );

  function onMoviePress(movieId: number): void {
    console.log(`====> DEBUG redirect movieId: `, movieId);
      router.push(`/movies/screens/movie/${movieId}`);

    // router.navigate({
    //   pathname: `/movies/screens/movie/[movieId]`,
    //   params: { movieId },
    // });
  }
  function onFilterGenreChange(_filter: string, index: number) {
    setGenreFilter(c => (c === index ? undefined : index));
  }

  function onFilterYearChange(_filter: string, index: number) {
    setYearFilter(c => (c === index ? undefined : index));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
  },
  header: {
    flex: 0.3,
  },
  filter: {
    padding: 10,
  },
  body: {
    flex: 0.7,
    borderWidth: 2,
    borderColor: 'gray',
  },
  footer: {
    flex: 0.15,
  },
});
