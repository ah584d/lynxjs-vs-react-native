import { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@fennex-sand/constants';

export const EmptySearchResult = (): ReactElement => {
  return (
    <View style={styles.emptySearchContainer}>
      <Text style={styles.emptySearchTitle}>No movies found</Text>
      <Text style={styles.emptySearchSubtitle}>Try searching with different keywords</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptySearchContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  emptySearchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.green,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySearchSubtitle: {
    fontSize: 16,
    color: Colors.light.grayBorder,
    textAlign: 'center',
    lineHeight: 22,
  },
});
