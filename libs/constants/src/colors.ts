/**
 * Centralized color definitions used across all apps.
 * The colors are defined for both light and dark modes.
 */

export const Colors = {
  light: {
    black: '#000',
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
    grayBorder: 'gray',
    green: 'green',
    white: 'white',
    gray: 'gray',
    darkGray: '#000',
    lightGray: '#9e9b9b4d',
    lightGray2: '#d0cbcb4d',
    lightGray3: '#ffffff9d',
    movieCardBackGround: '#f5f5f5',
    blue: '#2e47e7ff',
    lightGreen: '#eaf5eaff',
    purple: '#9f44e0ff',
    yellow: '#FFD700',
    orange: '#ff7f50',

    // Border colors
    lightBorder: '#ccc',
    borderLight: '#e0e0e0',

    // Text variants
    textMedium: '#4a4a4a',
    textLight: '#666666',

    // Background variants
    backgroundLight: '#e5e7eb',
    backgroundLightGray: '#f8f8f8',
    backgroundLightest: '#fafafa',
    backgroundDisabled: '#a0a0a0',
    backgroundGreenTint: '#e5ffed88',

    // Success/Warning/Error colors
    successBackground: '#d4edda',
    successText: '#155724',
    warningBackground: '#fff3cd',
    warningText: '#856404',
    errorBackground: '#f8d7da',
    errorText: '#721c24',
    errorLight: '#ffebee',
    error: '#f44336',

    // Brand colors
    greenDark: '#045107',
    purpleMaterial: '#9c27b0',
  },
  dark: {
    black: '#fff',
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    grayBorder: '#333',
    green: '#4CAF50',
    white: '#000',
    gray: '#666',
    darkGray: '#fff',
    lightGray: '#61646b80',
    lightGray2: '#2f3035b2',
    lightGray3: '#00000062',
    movieCardBackGround: '#1E1E1E',
    blue: '#5d7cf7ff',
    lightGreen: '#1a3e1aff',
    purple: '#b865f0ff',
    yellow: '#FFA500',
    orange: '#ff8c42',

    // Border colors
    lightBorder: '#555',
    borderLight: '#444',

    // Text variants
    textMedium: '#bbb',
    textLight: '#999',

    // Background variants
    backgroundLight: '#2a2a2a',
    backgroundLightGray: '#1f1f1f',
    backgroundLightest: '#252525',
    backgroundDisabled: '#666',
    backgroundGreenTint: '#1a3e1a88',

    // Success/Warning/Error colors
    successBackground: '#1a4a1a',
    successText: '#4caf50',
    warningBackground: '#4a3a1a',
    warningText: '#ffb74d',
    errorBackground: '#4a1a1a',
    errorText: '#f44336',
    errorLight: '#3a1a1a',
    error: '#f44336',

    // Brand colors
    greenDark: '#66bb6a',
    purpleMaterial: '#ab47bc',
  },
};

// Utility function to get CSS custom properties from colors object
export const generateCSSCustomProperties = (theme: 'light' | 'dark' = 'light') => {
  const colors = Colors[theme];
  const cssProps: Record<string, string> = {};

  Object.entries(colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    cssProps[`--color-${cssKey}`] = value;
  });

  return cssProps;
};

// Export individual color palettes for easier access
export const LightColors = Colors.light;
export const DarkColors = Colors.dark;
