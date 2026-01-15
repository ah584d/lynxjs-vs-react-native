import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMovieStore } from '@fennex-sand/hooks';
import { Movie } from '@fennex-sand/types';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/common/colors';

export default function MovieDetailsScreen() {
  const { id: movieId } = useLocalSearchParams<{ id: string }>();
  const { moviesList, isLoading, error } = useMovieStore();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    if (movieId) {
      const found = moviesList.find(item => item.id.toString() === movieId);
      setMovie(found);
    }
  }, [movieId, moviesList]);

  if (isLoading && !movie) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!movie) {
    return null;
  }

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <Image source={{ uri: posterUrl }} style={styles.poster} />
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>Rating:</Text>
            <Icon name='star' size={20} color={Colors.light.yellow} />
            <Text style={styles.text}>{movie.vote_average.toFixed(1)}/10</Text>
          </View>
          <Text style={styles.text}>Release date: {movie.release_date}</Text>
        </View>
        <Text style={[styles.text, { marginBottom: 8 }]}>Overview:</Text>
        <Text style={styles.summary}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.movieCardBackGround,
  },
  body: {
    paddingHorizontal: 16,
  },
  poster: {
    width: 250,
    height: 350,
    borderRadius: 4,
    borderColor: Colors.light.grayBorder,
    borderWidth: 1,
    marginVertical: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  summary: {
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  errorText: {
    color: Colors.light.purple,
    textAlign: 'center',
    marginTop: 20,
  },
});
