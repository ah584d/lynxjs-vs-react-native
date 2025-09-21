import React, { FC, ReactElement, useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '@/common/colors';
import { Movie } from '@/types/common.types';
import { getGenreNames } from '@/services/utils';

interface MovieCardProps {
  movie: Movie;
  onPress: (movieId: number) => void;
  customStyle?: StyleProp<ViewStyle>;
}

export const MovieCard= ({ movie, onPress, customStyle }: MovieCardProps): ReactElement => {
  const [imageError, setImageError] = useState(false);

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={() => onPress(movie.id)}>
      <View style={styles.posterContainer}>
        <RenderMoviePicture />
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name='star' size={18} color={Colors.light.yellow} />
          <Text style={styles.rating}>{movie?.vote_average?.toFixed(1)}/10</Text>
        </View>
        <Text style={styles.subText}>{movie.overview}</Text>
        <Text style={styles.subText}>Release date: {new Date(movie?.release_date ?? '').getFullYear()}</Text>
        <Text style={styles.subText}>Genres: {getGenreNames(movie.genre_ids)}</Text>
      </View>
    </TouchableOpacity>
  );

  function RenderMoviePicture(): ReactElement {
    // TODO: to extract
    return imageError ? (
      <View style={styles.poster}>
        <Text style={styles.oopsText}>Oops!!</Text>
        <Icon name='emoji-sad' size={60} color='orange' />
        <Text style={styles.oopsText}>something went wrong</Text>
      </View>
    ) : (
      <Image source={{ uri: posterUrl }} style={styles.poster} onError={() => setImageError(true)} />
    );
  }
};

export const MovieCardMemo = React.memo(MovieCard);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.light.white,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGray2,
  },
  posterContainer: {
    alignItems: 'center',
  },
  poster: {
    width: 200,
    height: 290,
    borderRadius: 4,
    borderColor: Colors.light.grayBorder,
    borderWidth: 1,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
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
    fontWeight: 600,
    color: Colors.light.blue,
  },
  subText: {
    fontSize: 14,
    color: Colors.light.darkGray,
        marginBottom: 5,

  },
  oopsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.purple,
    padding: 16,
    textAlign: 'center',
  },
});
