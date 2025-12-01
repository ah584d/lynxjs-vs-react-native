import { ALL, GENRES_FILTER, GENRE_MAP, GENRE_MAP_INVERTED, TMDB_BASE_URL, YEARS_FILTER } from '@repo/constants';

export const API_KEY = process.env.TMDB_API_KEY;

export const IMDB_CHUNK_SIZE = 20;

export const IS_ANDROID = SystemInfo.platform === 'Android';
export const IS_IOS = SystemInfo.platform === 'iOS';

// Re-export common constants
export { GENRE_MAP, GENRE_MAP_INVERTED, TMDB_BASE_URL, YEARS_FILTER, GENRES_FILTER, ALL };
