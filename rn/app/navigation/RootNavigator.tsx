import React from 'react';
import { Stack } from 'expo-router';
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
      <Stack.Screen
        name='movies/movie/[id]'
        options={{
          headerTitle: 'Movie Detail',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
};
