import axios from 'axios';

const apiKey = 'fec4740c10b37930b5b40b6b2e95707b';
const baseUrl = 'https://api.themoviedb.org/3';
const endpoint = '/tv/top_rated';

const getSeries = async () => {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: {
        api_key: apiKey,
        language: 'es-ES' // Puedes cambiar el idioma según tus preferencias
        }
    })
    return response;
};

export { getSeries };