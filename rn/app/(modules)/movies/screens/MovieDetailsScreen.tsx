import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '@/types/common';
import { RouteProp } from '@react-navigation/native';
import { useMovieStore } from '../stores/useMovieStore';

type MovieDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

interface MovieDetailsScreenProps {
  route: MovieDetailsScreenRouteProp;
}

export const MovieDetailsScreen = ({ route }: MovieDetailsScreenProps) => {
  const { movieId } = route.params;
  const movieStore = useMovieStore();

  useEffect(() => {
    // movieStore.(movieId);
  }, [movieId]);

  if (movieStore.isLoading /*&& !movieStore.selectedMovie*/) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (movieStore.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{movieStore.error}</Text>
      </View>
    );
  }

  const movie = null; // movieStore.selectedMovie;
  if (!movie) return null;

  const backdropUrl = {}; //movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : 'https://via.placeholder.com/500x281?text=No+Backdrop';

  return (
    // <ScrollView style={styles.container}>
    //   <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
    //   <View style={styles.content}>
    //     <Text style={styles.title}>{movie?.title}</Text>
    //     <View style={styles.metaContainer}>
    //       <View style={styles.ratingContainer}>
    //         <Icon name='star' size={20} color='#FFD700' />
    //         <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
    //       </View>
    //       <Text style={styles.year}>{new Date(movie.release_date).getFullYear()}</Text>
    //       <Text style={styles.runtime}>{movie.runtime} min</Text>
    //     </View>
    //     <View style={styles.genresContainer}>
    //       {movie.genres.map(genre => (
    //         <Text key={genre.id} style={styles.genre}>
    //           {genre.name}
    //         </Text>
    //       ))}
    //     </View>
    //     <Text style={styles.overview}>{movie.overview}</Text>
    //   </View>
    // </ScrollView>
    <></>
  );
};

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
  runtime: {
    fontSize: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  genre: {
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    fontSize: 14,
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
