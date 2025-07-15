import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreenNavigationProp } from '../../../types/common';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../services/MovieService';
import { useMovieStore } from '../stores/MovieStore';

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen = observer(({ navigation }: HomeScreenProps) => {
  const movieStore = useMovieStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    movieStore.fetchPopularMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      movieStore.searchMovies(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const moviesToDisplay = searchQuery ? movieStore.searchResults : movieStore.popularMovies;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name='search' size={20} color='#666' style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder='Search movies...' value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {movieStore.isLoading && !moviesToDisplay.length ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : movieStore.error ? (
        <Text style={styles.errorText}>{movieStore.error}</Text>
      ) : (
        <FlatList data={moviesToDisplay} renderItem={renderItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} />
      )}
    </View>
  );

  function renderItem({ item }: { item: Movie }) {
    return <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })} />;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});
