import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMovieStore } from '@fennex-sand/hooks';
import { getPosterUrl } from '@fennex-sand/services';
import { Movie } from '@fennex-sand/types';
import { useLocalSearchParams } from 'expo-router';
import { useShallow } from 'zustand/react/shallow';
import { createThemedStyles, useTheme, useThemedStyles } from '@/hooks/useTheme';

export default function MovieDetailsScreen() {
  const { id: movieId } = useLocalSearchParams<{ id: string }>();
  const { moviesList, isLoading, error, searchResults } = useMovieStore(
    useShallow(state => ({
      moviesList: state.moviesList,
      isLoading: state.isLoading,
      error: state.error,
      searchResults: state.searchResults,
    })),
  );
  const [movie, setMovie] = useState<Movie>();
  const { colors } = useTheme();
  const style = useThemedStyles(styles.light, styles.dark);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const list = searchResults.length > 0 ? searchResults : moviesList;
    const found = list.find(item => item.id.toString() === movieId);
    setMovie(found);
  }, [movieId, moviesList, searchResults]);

  if (isLoading && !movie) {
    return (
      <View style={style.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.container}>
        <Text style={style.errorText}>{error}</Text>
      </View>
    );
  }

  if (!movie) {
    return null;
  }

  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <ScrollView style={style.container}>
      <View style={style.body}>
        <Image source={{ uri: posterUrl }} style={style.poster} />
        <Text style={style.title}>{movie.title}</Text>
        <View style={style.metaContainer}>
          <View style={style.ratingContainer}>
            <Text style={style.text}>Rating:</Text>
            <Icon name='star' size={20} color={colors.yellow} />
            <Text style={style.text}>{movie.vote_average.toFixed(1)}/10</Text>
          </View>
          <Text style={style.text}>Release date: {movie.release_date}</Text>
        </View>
        <Text style={[style.text, { marginBottom: 8 }]}>Overview:</Text>
        <Text style={style.summary}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.movieCardBackGround,
    },
    body: {
      paddingHorizontal: 16,
    },
    poster: {
      width: 250,
      height: 350,
      borderRadius: 4,
      borderColor: colors.grayBorder,
      borderWidth: 1,
      marginVertical: 16,
      alignSelf: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.darkGray,
    },
    metaContainer: {
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 24,
      color: colors.darkGray,
    },
    summary: {
      fontSize: 18,
      fontWeight: 'normal',
      lineHeight: 24,
      color: colors.darkGray,
    },
    errorText: {
      color: colors.purple,
      textAlign: 'center',
      marginTop: 20,
    },
  }),
);
