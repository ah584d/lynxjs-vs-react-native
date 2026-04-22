import { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';

export const EmptySearchResult = (): ReactElement => {
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <View style={style.emptySearchContainer}>
      <Text style={style.emptySearchTitle}>No movies found</Text>
      <Text style={style.emptySearchSubtitle}>Try searching with different keywords</Text>
    </View>
  );
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
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
      color: colors.green,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySearchSubtitle: {
      fontSize: 16,
      color: colors.grayBorder,
      textAlign: 'center',
      lineHeight: 22,
    },
  }),
);
