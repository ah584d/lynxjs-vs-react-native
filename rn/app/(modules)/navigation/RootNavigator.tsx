import React from 'react';
import { RootStackParamList } from '@/types/common';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieDetailsScreen } from '../movies/screens/MovieDetailsScreen';
import HomeScreen from '../movies/screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Movie With RN' }} />
      <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} options={{ title: 'Movie Details' }} />
    </Stack.Navigator>
  );
};
