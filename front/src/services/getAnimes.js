import axios from 'axios';

const apiKey = 'fec4740c10b37930b5b40b6b2e95707b';
const baseUrl = 'https://api.themoviedb.org/3';
const endpoint = '/discover/tv';

const getAnimes = async () => {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: {
        api_key: apiKey,
        with_origin_country: 'JP',
        language: 'es-ES'
        }
    })
    return response;
};

export { getAnimes };