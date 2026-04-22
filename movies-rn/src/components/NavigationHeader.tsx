import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { createThemedStyles, useTheme, useThemedStyles } from '@/hooks/useTheme';
import { Hamburger } from './Hamburger';

export const NavigationHeader = () => {
  const { metrics } = usePerformanceMonitor();
  const { colors } = useTheme();
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <SafeAreaView edges={['top']} style={style.safeArea}>
      <View style={style.header}>
        <Hamburger />
        <Text style={style.title}>
          <Text style={style.titleText}>fliX</Text>
          <Text style={[style.titleText, { color: colors.black }]}>trends</Text>
        </Text>
        <Text style={style.fpsText}>{metrics.fps} fps</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
    },
    header: {
      height: 36,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 16,
      backgroundColor: colors.background,
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 20,
      color: colors.purple,
      fontWeight: 'bold',
    },
    fpsText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
    },
    moviesCountLabel: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
      marginBottom: 4,
    },
  }),
);
