import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/common/colors';
import { ALL, GENRES_FILTER, GENRE_MAP, YEARS_FILTER } from '@/common/constants';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { MovieCard } from '@/components/MovieCard';
import { useMovieStore } from '@/hooks/useMovieStore';
import { Movie } from '@/types/common.types';

export default function HomeScreen() {
  const [genreFilter, setGenreFilter] = useState<number>(0);
  const [yearFilter, setYearFilter] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [forceRefresh, setForceRefresh] = useState(false);

  const fetchMovies = useMovieStore(state => state.fetchMovies);
  const popularMovies = useMovieStore(state => state.popularMovies);
  const isLoading = useMovieStore(state => state.isLoading);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  const onRefresh = useCallback(async () => {
    setForceRefresh(true);
    await fetchMovies(currentPage, yearFilter ? YEARS_FILTER[yearFilter] : ALL, genreFilter && GENRE_MAP[GENRES_FILTER[genreFilter]]);
    setForceRefresh(false);
  }, [forceRefresh]);

  console.log(`\n\n====> DEBUG movies list: `, popularMovies?.length);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filter}>
          <Filter title='Genre' currentSelection={genreFilter} filters={GENRES_FILTER} onFilterChange={onFilterGenreChange} />
        </View>
        <View style={styles.filter}>
          <Filter title='Year' currentSelection={yearFilter} filters={YEARS_FILTER} onFilterChange={onFilterYearChange} />
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={popularMovies}
          renderItem={renderItem}
          contentContainerStyle={popularMovies?.length ? undefined : styles.emptyListContainer}
          refreshControl={<RefreshControl refreshing={forceRefresh} onRefresh={onRefresh} />}
        />
        {isLoading && (
          <View style={styles.centeredOverlay}>
            <ActivityIndicator size='large' color={Colors.light.buttonBackground} />
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Button
          title={isLoading ? 'Loading...' : 'Refresh list'}
          onPress={onRefresh}
          customStyle={[styles.loadButton, isLoading && styles.loadButtonDisabled]}
          customStyleText={styles.loadButtonLabel}
          disabled={isLoading}
        />
      </View>
    </View>
  );

  function renderItem({ item, index }: { item: Movie; index: number }): ReactElement {
    return <MovieCard movie={item} onPress={onMoviePress} customStyle={index % 2 ? styles.cardCustomStyle : undefined} />;
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
    paddingHorizontal: 16,
  },
  header: {
    flex: 0.2,
  },
  filter: {
    paddingVertical: 4,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // optional: dim background while loading
    // backgroundColor: 'rgba(0,0,0,0.05)',
    zIndex: 10,
  },
  body: {
    flex: 0.7,
  },
  cardCustomStyle: {
    backgroundColor: Colors.light.lightGreen,
  },
  footer: {
    paddingTop: 12,
    flex: 0.12,
    alignItems: 'center',
  },
  loadButton: {
    width: '90%',
    backgroundColor: Colors.light.buttonBackground,
    height: 54,
    padding: 12,
  },
  loadButtonDisabled: {
    opacity: 0.5,
  },
  loadButtonLabel: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    color: Colors.light.white,
  },
});
