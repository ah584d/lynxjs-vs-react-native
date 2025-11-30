import { Platform } from 'react-native';

export const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
