import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Movie } from '../services/MovieService';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
        </View>
        <Text style={styles.releaseDate}>
          {new Date(movie.release_date).getFullYear()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
});