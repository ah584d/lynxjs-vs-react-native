import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MovieCard } from '../components/MovieCard';
import { useMovieStore } from '../stores/useMovieStore';

export default function HomeScreen() {
  const { popularMovies, searchResults, isLoading, error, fetchPopularMovies, searchMovies, setFilter, filter } = useMovieStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const moviesToDisplay = searchQuery || filter ? searchResults : popularMovies;

  function handleFilter(genre: string | null) {
    setFilter(genre);
    setShowFilter(false);
  }

  function renderItem({ item }: { item: any }) {
    return <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name='magnify' size={20} color='#666' style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder='Search movies...' value={searchQuery} onChangeText={setSearchQuery} />
        <TouchableOpacity onPress={() => setShowFilter(!showFilter)} style={styles.filterButton}>
          <Icon name='filter-variant' size={22} color={filter ? '#007AFF' : '#666'} />
        </TouchableOpacity>
      </View>
      {showFilter && (
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => handleFilter(null)} style={styles.filterOption}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('action')} style={styles.filterOption}>
            <Text>Action</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('drama')} style={styles.filterOption}>
            <Text>Drama</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('comedy')} style={styles.filterOption}>
            <Text>Comedy</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading && !moviesToDisplay.length ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList data={moviesToDisplay} renderItem={renderItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} />
      )}
    </View>
  );
}

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
  filterButton: {
    marginLeft: 10,
    padding: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginHorizontal: 4,
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
