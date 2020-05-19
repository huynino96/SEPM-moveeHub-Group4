// Configuration for API
export const API_URL = 'https://cms.hubiee.com/hubiee';
export const ITEM_URL = API_URL + '/items';
export const AUTH_URL = API_URL + '/auth';
export const CONTACT_COLLECTION = '/contacts';

// Redirect to page after authenticated successfully
export const REDIRECT_TO = '/profile';

// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f
export const IMDB_URL = 'https://api.themoviedb.org/3';
export const IMDB_KEY = '844dba0bfd8f3a4f3799f6130ef9e335';
export const IMDB_LANGUAGE = 'en-us';

// ENDPOINTS
export const MOVIE_URL = '/movie';
export const SEARCH_URL = '/search/movie';

// MOVIE PARAMS
export const MOVIE_PARAM = { append_to_response: 'videos,credits,release_dates' };

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Sizes: w300, w780, w1280, original
export const BACKDROP_SIZE = 'w1280';

// Sizes: w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE = 'w500';
