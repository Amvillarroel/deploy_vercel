import axios from 'axios';

const apiKey = 'bec40571116fd8e156da2e5350b0478f'; // Reemplaza con tu propia API Key de TMDB
const baseUrl = 'https://api.themoviedb.org/3';
const popularMoviesEndpoint = '/movie/popular';

const getMovies = async () => {
    const response = await axios.get(`${baseUrl}${popularMoviesEndpoint}`, {
        params: {
        api_key: apiKey,
        language: 'es-ES' // Puedes cambiar el idioma según tus preferencias
        }
    })
   
    return response;
    // .then(response => {
    //     const movies = response.data.results;
    //     console.log('Películas populares:', movies);
    //     // Aquí puedes hacer lo que quieras con los datos de las películas
    // })
    // .catch(error => {
    //     console.error('Error al obtener películas populares:', error);
    // });
};

export { getMovies };