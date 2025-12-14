export const GENRE_MAP: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  'TV Movie': 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export const GENRE_MAP_INVERTED = Object.fromEntries(Object.entries(GENRE_MAP).map(a => a.reverse()));
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const YEARS_FILTER = Array.from({ length: 4 }, (_, i) => (new Date().getUTCFullYear() - i).toString()).reverse();
export const GENRES_FILTER = ['All', 'Action', 'Comedy', 'Drama'];

export const ALL = 'all';
