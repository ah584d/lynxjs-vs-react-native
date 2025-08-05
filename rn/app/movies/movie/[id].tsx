import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from 'expo-router';
import { useMovieStore } from '@/stores/useMovieStore';
import { Movie } from '@/types/common.types';

export default function MovieDetailsScreen() {
  const { id: movieId } = useLocalSearchParams<{ id: string }>();
  const { popularMovies, isLoading, error } = useMovieStore();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    if (movieId) {
      const found = popularMovies.find(item => item.id.toString() === movieId);
      setMovie(found);
    }
  }, [movieId, popularMovies]);

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

  const posterUrl = movie.poster_path || 'https://via.placeholder.com/500x281?text=No+Poster';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <Image source={{ uri: posterUrl }} style={styles.poster} />
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>Rating:</Text>
            <Icon name='star' size={20} color='#FFD700' />
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
    backgroundColor: '#f5f5f5',
  },
  poster: {
    height: 200,
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  body: {
    paddingHorizontal: 16,
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
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
