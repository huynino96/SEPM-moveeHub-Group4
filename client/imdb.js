import axios from 'axios';
import { API_URL, API_KEY, API_LANGUAGE } from '../utils/constants';

const instance = axios.create({
    baseURL: API_URL,
});

instance.defaults.params = {};
instance.defaults.params['api_key'] = API_KEY;
instance.defaults.params['language'] = API_LANGUAGE;

export default instance;
