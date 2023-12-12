import axios from 'axios';

const TMDB_API = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'es-ES'
    },
    timeout: 4000
});

const TMDB_PATHS = {
    images_base_url: 'https://image.tmdb.org/t/p/original',
    movies: {
        genres: '/genre/movie/list',
        now_playing: '/movie/now_playing',
        popular: '/movie/popular',
        top_related: '/movie/top_rated',
        upcoming: '/movie/upcoming',
        discover: '/discover/movie'
    },
    series: {
        genres: '/genre/tv/list',
        airing_today: '/tv/airing_today',
        on_the_air: '/tv/on_the_air',
        popular: '/tv/popular',
        top_rated: '/tv/top_rated',
        discover: '/discover/tv'
    },
    genres: {
        accion: 28,
        aventura: 12,
        animacion: 16,
        comedia: 35,
        crimen: 80,
        documental: 99,
        drama: 18,
        familia: 10751,
        fantasia: 14,
        historia: 36,
        terror: 27,
        musica: 10402,
        misterio: 9648,
        romance: 10749,
        ciencia_ficcion: 878,
        pelicula_de_tv: 10770,
        suspenso: 53,
        belica: 10752,
        western: 37
    },
    region: {
        argentina: 'AR',
        colombia: 'CO',
        espana: 'ES',
        reino_unido: 'GB',
        japon: 'JP',
        usa: 'US',
        venezuela: 'VE'
    }
}

export { 
    TMDB_API,
    TMDB_PATHS
};