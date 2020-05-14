import axios from 'axios';
import { IMDB_URL, IMDB_KEY, IMDB_LANGUAGE } from '../utils/constants';

const instance = axios.create({
    baseURL: IMDB_URL,
});

instance.defaults.params = {};
instance.defaults.params['api_key'] = IMDB_KEY;
instance.defaults.params['language'] = IMDB_LANGUAGE;

export default instance;
