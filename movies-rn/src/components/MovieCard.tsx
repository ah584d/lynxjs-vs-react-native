import React, { ReactElement, Suspense } from 'react';
import { Animated, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { getGenreNames, getPosterUrl } from '@fennex-sand/services';
import { Movie } from '@fennex-sand/types';
import { usePulseCardAnimation } from '@/hooks/animations/useAnimations';
import { createThemedStyles, useTheme, useThemedStyles } from '@/hooks/useTheme';
import { MoviePicture, MoviePictureLoading } from './atoms/MoviePicture';

interface MovieCardProps {
  index: number;
  movie: Movie;
  onPress: (movieId: number) => void;
  customStyle?: StyleProp<ViewStyle>;
  scrollVelocity?: number;
}

export const MovieCard = (props: MovieCardProps): ReactElement => {
  const { index, movie, onPress, customStyle, scrollVelocity } = props;
  const posterUrl = getPosterUrl(movie.poster_path);
  const { colors } = useTheme();
  const style = useThemedStyles(styles.light, styles.dark);

  const scaleAnimation = usePulseCardAnimation(scrollVelocity ?? 0);

  const animatedStyle: StyleProp<ViewStyle> = {
    transform: [{ scale: scaleAnimation }],
  };

  return (
    <TouchableOpacity style={[style.container, customStyle]} onPress={() => onPress(movie.id)}>
      <Text style={style.debugIndex}>#{index + 1}</Text>
      <Animated.View style={[style.posterContainer, animatedStyle]}>
        <Suspense fallback={<MoviePictureLoading />}>
          <MoviePicture posterUrl={posterUrl} />
        </Suspense>
      </Animated.View>
      <View style={style.details}>
        <Text style={style.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={style.ratingContainer}>
          <Icon name='star' size={18} color={colors.yellow} />
          <Text style={style.rating}>{movie?.vote_average?.toFixed(1)}/10</Text>
        </View>
        <Text style={style.subText}>{movie.overview}</Text>
        <Text style={style.subText}>Release date: {new Date(movie?.release_date ?? '').getFullYear()}</Text>
        <Text style={style.subText}>Genres: {getGenreNames(movie.genre_ids)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const MovieCardMemo = React.memo(MovieCard);

// Create theme-aware styles (styles.light and styles.dark created once at module load)
const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: colors.white,
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGray2,
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
      color: colors.text,
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
      color: colors.blue,
    },
    subText: {
      fontSize: 14,
      color: colors.darkGray,
      marginBottom: 5,
    },
    debugIndex: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.darkGray,
    },
  }),
);
