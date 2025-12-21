import React from 'react';
import { Stack } from 'expo-router';
import { NavigationHeader } from '@/components/NavigationHeader';

export const RootNavigator = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          header: () => <NavigationHeader />,
        }}
      />
      <Stack.Screen
        name='performance'
        options={{
          headerTitle: 'Performance Dashboard',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name='movies/movie/[id]'
        options={{
          headerTitle: 'Movie Details',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
};
