import React from 'react';
import { Stack } from 'expo-router';
import HomeScreen from '@/movies/HomeScreen';
import MovieDetailsScreen from '@/movies/movie/[id]';
import { NavigationHeader } from './NavigationHeader';

export const RootNavigator = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          header: () => <NavigationHeader />,
        }}
      />
      <Stack.Screen name='movies/movie/[id]' />
    </Stack>
  );
};
