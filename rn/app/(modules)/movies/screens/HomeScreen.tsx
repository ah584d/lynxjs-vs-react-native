import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Colors } from '@/common/colors';
import { Filter } from '../components/Filter';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.genreFilter}>
          <Filter title='Genre' filters={['Action', 'Comedy', 'Drama']} onFilterChange={onFilterGenreChange} />
        </View>
        <View style={styles.yearFilter}>
          <Filter title='Year' filters={['2022', '2023', '2024', '2025']} onFilterChange={onFilterYearChange} />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.list}></View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );

  function onFilterGenreChange(filter: string) {
    console.log(`====> DEBUG filter: `, filter);
  }
  function onFilterYearChange(filter: string) {
    console.log(`====> DEBUG filter: `, filter);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
  },
  header: {
    flex: 0.3,
    borderWidth: 2,
    borderColor: 'purple',
  },
  genreFilter: {
    padding: 10,
    borderWidth: 2,
  },
  yearFilter: {
    padding: 10,

    borderWidth: 2,
  },
  body: {
    flex: 0.7,
    borderWidth: 2,
    borderColor: 'gray',
  },
  list: {
    borderWidth: 2,
    borderColor: 'green',
  },
  footer: {
    flex: 0.15,
    borderWidth: 2,
    borderColor: 'gray',
  },
});
