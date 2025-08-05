import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/common/colors';
import { useMovieStore } from '@/stores/useMovieStore';
import { Movie } from '@/types/common.types';
import { Filter } from '../components/Filter';
import { MovieCard } from '../components/MovieCard';

export default function HomeScreen() {
  const [genreFilter, setGenreFilter] = useState<number | undefined>(undefined);
  const [yearFilter, setYearFilter] = useState<number | undefined>(3);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPopularMovies = useMovieStore(state => state.fetchPopularMovies);
  const popularMovies = useMovieStore(state => state.popularMovies);

  useEffect(() => {
    fetchPopularMovies();
  }, [genreFilter, yearFilter, fetchPopularMovies]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPopularMovies();
    setRefreshing(false);
  }, []);

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
        <FlatList data={popularMovies} renderItem={renderItem} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      </View>
      <View style={styles.footer}></View>
    </View>
  );

  function renderItem({ item }: { item: Movie }): ReactElement {
    return <MovieCard movie={item} onPress={onMoviePress} />;
  }

  function onMoviePress(movieId: number): void {
    router.push({ pathname: '/movies/movie/[id]', params: { id: movieId } });
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
    borderColor: Colors.light.border,
  },
  footer: {
    flex: 0.15,
  },
});
