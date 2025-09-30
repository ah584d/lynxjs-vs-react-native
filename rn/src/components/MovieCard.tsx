import React, { ReactElement, useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '@/common/colors';
import { getGenreNames } from '@/services/utils';
import { Movie } from '@/types/common.types';
import { MoviePicture } from './atoms/MoviePicture';

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
      </View>
        <MoviePicture posterUrl={posterUrl} />
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
});
