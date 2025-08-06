import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@app/movies/RootNavigator';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </ThemeProvider>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
