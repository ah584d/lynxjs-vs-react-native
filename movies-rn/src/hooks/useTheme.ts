import { useColorScheme } from 'react-native';
import { Colors } from '@fennex-sand/constants';

/**
 * Hook to access the current theme and colors.
 * @returns An object containing:
 *  - colors: The color palette for the current theme
 *  - colorScheme: 'light' | 'dark'
 *  - isDark: boolean - true if dark mode is active
 */
export function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme as 'light' | 'dark'];
  const isDark = colorScheme === 'dark';

  return { colors, colorScheme, isDark };
}

/**
 * Hook to select the appropriate styles based on the current theme.
 * @param lightStyles - Styles for light mode
 * @param darkStyles - Styles for dark mode
 * @returns The appropriate styles for the current theme
 */
export function useThemedStyles<T>(lightStyles: T, darkStyles: T): T {
  const { isDark } = useTheme();
  return isDark ? darkStyles : lightStyles;
}

/**
 * Utility to create both light and dark themed styles from a factory function.
 * Call this at module level, not inside components.
 *
 * @param styleFactoryCB - Function that takes colors and returns StyleSheet
 * @returns Object with { light, dark } StyleSheets
 *
 * @example
 * const styles = createThemedStyles((colors) => StyleSheet.create({
 *   container: { backgroundColor: colors.white },
 *   text: { color: colors.text }
 * }));
 *
 * // Then in component:
 * const componentStyles = useThemedStyles(styles.light, styles.dark);
 */
export function createThemedStyles<T>(styleFactoryCB: (colors: typeof Colors.light) => T): { light: T; dark: T } {
  return {
    light: styleFactoryCB(Colors.light),
    dark: styleFactoryCB(Colors.dark),
  };
}
