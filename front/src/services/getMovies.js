import { TMDB_API } from '../remote/TMDB_API';

const getMovies = async (endpoint, params) => {
    const { data: {results }} = await TMDB_API.get(endpoint, params)
    return results;
};

export { getMovies };