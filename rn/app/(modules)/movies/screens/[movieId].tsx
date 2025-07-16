import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMovieStore } from '@/(modules)/movies/stores/useMovieStore';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MovieDetailsScreen() {
  const { movieId } = useLocalSearchParams();
  const { popularMovies, isLoading, error } = useMovieStore();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (movieId) {
      const found = popularMovies.find(m => m.id.toString() === movieId);
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

  if (!movie) return null;

  const posterUrl = movie.posterUrl || 'https://via.placeholder.com/500x281?text=No+Poster';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: posterUrl }} style={styles.backdrop} />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Icon name='star' size={20} color='#FFD700' />
            <Text style={styles.rating}>{movie.rating}</Text>
          </View>
          <Text style={styles.year}>{movie.releaseDate?.slice(0, 4)}</Text>
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
  },
  year: {
    marginRight: 15,
    fontSize: 16,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
