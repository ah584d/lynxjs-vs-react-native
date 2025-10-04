import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/common/colors';
import { GENRES_FILTER, YEARS_FILTER } from '@/common/constants';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { MovieCardMemo } from '@/components/MovieCard';
import { useMovieStore } from '@/hooks/useMovieStore';
import { Movie } from '@/types/common.types';

export default function HomeScreen() {
  const [genreFilter, setGenreFilter] = useState<number | undefined>(0);
  const [yearFilter, setYearFilter] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [dirtyFilter, setDirtyFilter] = useState(false);
  const flatListRef = useRef<FlatList<Movie> | null>(null);

  const getMovies = useMovieStore(state => state.getMovies);
  const resetList = useMovieStore(state => state.resetList);
  const moviesList = useMovieStore(state => state.moviesList);
  const isLoading = useMovieStore(state => state.isLoading);
  const error = useMovieStore(state => state.error);

  useEffect(() => {
    getMovies(currentPage, yearFilter, genreFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMovies, currentPage]);

  const onRefresh = useCallback(async () => {
    setDirtyFilter(false);
    setCurrentPage(1);
    setForceRefresh(true);

    // request page 1 explicitly after resetting currentPage so we refresh the first page
    await getMovies(1, yearFilter, genreFilter);
    setForceRefresh(false);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [yearFilter, genreFilter, getMovies]);

  console.log(`\n\n====> DEBUG movies list: `, moviesList?.length);

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
          ref={flatListRef}
          data={moviesList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id ?? 'movie'}_${index}`}
          contentContainerStyle={moviesList?.length ? undefined : styles.emptyListContainer}
          refreshControl={<RefreshControl refreshing={forceRefresh} onRefresh={resetListAndGetMovies} />}
          onEndReachedThreshold={0.3}
          onEndReached={() => !isLoading && setCurrentPage(prev => prev + 1)}
        />
        {isLoading && (
          <View style={styles.centeredOverlay}>
            <ActivityIndicator size='large' color={Colors.light.green} />
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <View style={styles.errorBox}>
              <ActivityIndicator size='small' color={Colors.light.green} style={{ marginBottom: 8 }} />
              <Button title='Retry' onPress={onRefresh} customStyle={[styles.loadButton, styles.errorButton]} customStyleText={styles.loadButtonLabel} />
              <View style={styles.errorTextWrapper}>
                <Text style={styles.errorText}>{typeof error === 'string' ? error : 'An unexpected error occurred.'}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Button
          title={isLoading ? 'Loading...' : 'Refresh list'}
          onPress={onRefresh}
          customStyle={[styles.loadButton, (isLoading || !dirtyFilter) && styles.loadButtonDisabled]}
          customStyleText={styles.loadButtonLabel}
          disabled={isLoading || !dirtyFilter}
        />
      </View>
    </View>
  );

  function renderItem({ item, index }: { item: Movie; index: number }): ReactElement {
    // let FlatList handle the key via keyExtractor; do not create non-stable keys (e.g. Symbol)
    return <MovieCardMemo movie={item} onPress={onMoviePress} customStyle={index % 2 ? styles.cardCustomStyle : undefined} />;
  }

  function onMoviePress(movieId: number): void {
    router.push({ pathname: '/movies/movie/[id]', params: { id: movieId } });
  }

  function onFilterGenreChange(_filter: string, index: number) {
    if (index !== genreFilter) {
      setDirtyFilter(true);
    }
    setGenreFilter(index);
  }

  function onFilterYearChange(_filter: string, index: number) {
    if (index !== yearFilter) {
      setDirtyFilter(true);
    }
    setYearFilter(index);
  }

  function resetListAndGetMovies() {
    resetList();
    onRefresh();
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.08)',
    zIndex: 20,
  },
  errorBox: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    minWidth: 260,
  },
  errorTextWrapper: {
    marginTop: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: Colors.light.green,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  errorButton: {
    backgroundColor: Colors.light.green,
    marginTop: 8,
  },
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
    backgroundColor: Colors.light.green,
    height: 50,
    padding: 12,
  },
  loadButtonDisabled: {
    opacity: 0.5,
    backgroundColor: Colors.light.grayBorder,
  },
  loadButtonLabel: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
    color: Colors.light.white,
  },
});
