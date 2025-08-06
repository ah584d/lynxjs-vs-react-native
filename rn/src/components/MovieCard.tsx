import React, { FC, ReactElement, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '@/common/colors';
import { Movie } from '@/types/common.types';

interface MovieCardProps {
  movie: Movie;
  onPress: (movieId: number) => void;
}

export const MovieCard: FC<MovieCardProps> = ({ movie, onPress }) => {
  const [imageError, setImageError] = useState(false);

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  console.log(`====> DEBUG posterUrl in Movie card: `, posterUrl);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(movie.id)}>
      <RenderMoviePicture />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name='star' size={16} color='#FFD700' />
          <Text style={styles.rating}>{movie?.vote_average?.toFixed(1)}</Text>
        </View>
        <Text style={styles.releaseDate}>{new Date(movie?.release_date ?? '').getFullYear()}</Text>
      </View>
    </TouchableOpacity>
  );

  function RenderMoviePicture(): ReactElement {
    return imageError ? (
      <View style={styles.poster}>
        <Icon name='emoji-sad' size={40} color='orange' />
      </View>
    ) : (
      <Image source={{ uri: posterUrl }} style={styles.poster} onError={() => setImageError(true)} />
    );
  }
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
    borderColor: Colors.light.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
