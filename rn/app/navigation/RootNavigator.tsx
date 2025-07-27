import React from 'react';
import HomeScreen from '@/movies/screens/HomeScreen';
import MovieDetailsScreen from '@/movies/screens/movie/[movieId]';
import { RootStackParamList } from '@/types/common.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationHeader } from './NavigationHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          header: () => <NavigationHeader />,
        }}
      />
      <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
};
