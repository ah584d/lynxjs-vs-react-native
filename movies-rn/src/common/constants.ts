import { Platform } from 'react-native';
import { ALL, GENRES_FILTER, GENRE_MAP, GENRE_MAP_INVERTED, TMDB_BASE_URL, YEARS_FILTER } from '@fennex-sand/constants';

export const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || '';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

// Re-export common constants
export { GENRE_MAP, GENRE_MAP_INVERTED, TMDB_BASE_URL, YEARS_FILTER, GENRES_FILTER, ALL };
