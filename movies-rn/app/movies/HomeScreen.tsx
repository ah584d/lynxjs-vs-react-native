import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useMovieStore } from '@fennex-sand/hooks';
import { Movie } from '@fennex-sand/types';
import { router } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import { API_KEY } from '@/common/constants';
import { Button } from '@/components/Button';
import { MenuCurtain } from '@/components/MenuCurtain';
import { MovieCardMemo } from '@/components/MovieCard';
import { EmptySearchResult } from '@/components/atoms/EmptySearchResult';
import { FiltersSection } from '@/components/filters/FiltersSection';
import { createThemedStyles, useTheme, useThemedStyles } from '@/hooks/useTheme';

export default function HomeScreen() {
  const [genreFilter, setGenreFilter] = useState<number | undefined>(0);
  const [yearFilter, setYearFilter] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const flatListRef = useRef<FlatList<Movie> | null>(null);

  const { colors } = useTheme();
  const style = useThemedStyles(styles.light, styles.dark);

  const { getMovies, resetList, moviesList, searchResults, isLoading, error, setOpenMenu } = useMovieStore(
    useShallow(state => ({
      getMovies: state.getMovies,
      resetList: state.resetList,
      moviesList: state.moviesList,
      searchResults: state.searchResults,
      isLoading: state.isLoading,
      error: state.error,
      setOpenMenu: state.setOpenMenu,
    })),
  );

  useEffect(() => {
    getMovies(API_KEY, currentPage, yearFilter, genreFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMovies, currentPage]);

  const fetchCleanList = useCallback(async () => {
    resetList();
    setFilterChanged(false);
    setCurrentPage(1);
    setForceRefresh(true);

    // request page 1 explicitly after resetting currentPage so we refresh to the first page
    await getMovies(API_KEY, 1, yearFilter, genreFilter);
    setForceRefresh(false);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [yearFilter, genreFilter, getMovies, resetList]);

  const hasSearchText = searchText.trim().length > 0;
  const moviesToDisplay = hasSearchText ? searchResults : moviesList;
  const showEmptySearchState = hasSearchText && searchResults.length === 0 && !isLoading;
  const isButtonDisabled = isLoading || (!filterChanged && !hasSearchText);

  const cacheSize = moviesList.length > 0 ? `(${moviesList.length})` : '';
  return (
    <View style={style.container}>
      <MenuCurtain />
      <FiltersSection
        genreFilter={genreFilter}
        yearFilter={yearFilter}
        searchText={searchText}
        onFilterGenreChange={onFilterGenreChange}
        onFilterYearChange={onFilterYearChange}
        onSearchTextChange={setSearchText}
      />
      <View style={style.body}>
        <FlatList
          style={style.listContainer}
          ref={flatListRef}
          data={moviesToDisplay}
          renderItem={RenderMovieItem}
          keyExtractor={(item, index) => `${item.id ?? 'movie'}_${index}`}
          contentContainerStyle={moviesToDisplay?.length ? undefined : style.emptyListContainer}
          refreshControl={<RefreshControl refreshing={forceRefresh} onRefresh={fetchCleanList} />}
          onEndReachedThreshold={0.3}
          onEndReached={() => !isLoading && !hasSearchText && setCurrentPage(prev => prev + 1)}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        {showEmptySearchState && <EmptySearchResult />}
        {isLoading && (
          <View style={style.centeredOverlay}>
            <ActivityIndicator size='large' color={colors.green} />
          </View>
        )}
        <RenderErrorRetry />
      </View>
      <View style={style.footer}>
        <Button
          title={isLoading ? 'Loading...' : `Refresh list ${cacheSize}`}
          onPress={fetchCleanList}
          customStyle={[style.loadButton, isButtonDisabled && style.loadButtonDisabled]}
          customStyleText={style.loadButtonLabel}
          disabled={isButtonDisabled}
        />
      </View>
    </View>
  );

  function RenderErrorRetry(): ReactElement | null {
    if (!error) {
      return null;
    }
    return (
      <View style={style.errorContainer}>
        <View style={style.errorBox}>
          <ActivityIndicator size='small' color={colors.green} style={{ marginBottom: 8 }} />
          <Button
            title='Retry'
            onPress={fetchCleanList}
            customStyle={[style.loadButton, style.errorButton]}
            customStyleText={style.loadButtonLabel}
          />
          <View style={style.errorTextWrapper}>
            <Text style={style.errorText}>{typeof error === 'string' ? error : 'An unexpected error occurred.'}</Text>
          </View>
        </View>
      </View>
    );
  }

  function RenderMovieItem({ item, index }: { item: Movie; index: number }): ReactElement {
    return (
      <MovieCardMemo
        index={index}
        movie={item}
        onPress={onMoviePress}
        customStyle={index % 2 ? undefined : style.cardCustomStyle}
        scrollVelocity={scrollVelocity}
      />
    );
  }

  function onMoviePress(movieId: number): void {
    setOpenMenu(false);
    router.push({ pathname: '/movies/movie/[id]', params: { id: movieId } });
  }

  function onFilterGenreChange(activeIndex: number) {
    if (activeIndex !== genreFilter) {
      setFilterChanged(true);
    }
    setGenreFilter(activeIndex);
  }

  function onFilterYearChange(activeIndex: number) {
    if (activeIndex !== yearFilter) {
      setFilterChanged(true);
    }
    setYearFilter(activeIndex);
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const currentTime = Date.now();

    // Calculate velocity
    const deltaY = currentOffset - lastScrollY.current;
    const deltaTime = currentTime - lastScrollTime.current;
    const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;

    setScrollVelocity(Math.min(Math.max(velocity, -5), 5)); // Clamp velocity

    lastScrollY.current = currentOffset;
    lastScrollTime.current = currentTime;
  }
}

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    listContainer: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    errorContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.errorBackground,
      borderRadius: 12,
      zIndex: 20,
    },
    errorBox: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      shadowColor: colors.black,
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
      color: colors.green,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
    errorButton: {
      backgroundColor: colors.green,
      marginTop: 8,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
      paddingHorizontal: 16,
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
      flex: 0.87,
    },
    cardCustomStyle: {
      backgroundColor: colors.lightGreen,
    },
    footer: {
      paddingTop: 12,
      flex: 0.11,
      alignItems: 'center',
    },
    loadButton: {
      width: '100%',
      backgroundColor: colors.green,
      height: 50,
      padding: 12,
    },
    loadButtonDisabled: {
      opacity: 0.5,
      backgroundColor: colors.grayBorder,
    },
    loadButtonLabel: {
      fontSize: 18,
      lineHeight: 20,
      fontWeight: 'bold',
      color: colors.white,
    },
  }),
);
