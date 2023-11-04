import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = import.meta.env.VITE_API_MOVIES_ENDPOINT;


const getMovies = async () => {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: {
        api_key: apiKey,
        language: 'es-ES'
        }
    })
    return response;
};

export { getMovies };