import { TMDB_API, TMDB_PATHS } from '../remote/TMDB_API';

const getGenresMovies = async () => {
    const {data: {genres}} = await TMDB_API.get(TMDB_PATHS.movies.genres);
    return genres;
}

export { getGenresMovies };