import React, { ReactElement, Suspense } from 'react';
import { Animated, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '@/common/colors';
import { usePulseCardAnimation } from '@/hooks/useAnimations';
import { getGenreNames, getPosterUrl } from '@fennex-sand/services';
import { Movie } from '@fennex-sand/types';
import { MoviePicture, MoviePictureLoading } from './atoms/MoviePicture' ;

interface MovieCardProps {
  index: number;
  movie: Movie;
  onPress: (movieId: number) => void;
  customStyle?: StyleProp<ViewStyle> ;
  scrollVelocity?: number;
}

export const MovieCard = (props: MovieCardProps): ReactElement => {
  const { index, movie, onPress, customStyle, scrollVelocity } = props;
  const posterUrl = getPosterUrl(movie.poster_path);

  const scaleAnimation = usePulseCardAnimation(scrollVelocity ?? 0);

  const animatedStyle: StyleProp<ViewStyle> = {
    transform: [{ scale: scaleAnimation }],
  };

  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={() => onPress(movie.id)}>
      <Text style={styles.debugIndex}>#{index + 1}</Text>
      <Animated.View style={[styles.posterContainer, animatedStyle]}>
        <Suspense fallback={<MoviePictureLoading />}>
          <MoviePicture posterUrl={posterUrl} />
        </Suspense>
      </Animated.View>
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
    shadowColor: Colors.light.black,
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
  debugIndex: {
    fontSize: 12,
    color: Colors.light.darkGray,
  },
});
