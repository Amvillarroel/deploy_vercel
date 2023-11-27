import React, { useEffect, useState } from 'react'
import { useMultifetch } from '../hooks/useMultiFetch';
import { getMovies } from '../services/getMovies';
import { getSeries } from '../services/getSeries';
import { getMovieAdapter } from '../adapters/getMovieAdapter';
import { getSeriesAdapter } from '../adapters/getSeriesAdapter';
import { getGenresMovies } from '../services/getGenresMovies';
import { TMDB_PATHS } from '../remote/TMDB_API';
import { List } from './List/List';
import { Slider } from './Slider/Slider';

const Home = () => {
    const { list, isLoading, error } = useMultifetch([
        {
            name: 'Proximas Populares (probando cambios en vercel)',
            request: getMovies,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.popular
        },
        {
            name: 'Series Populares',
            request: getSeries,
            adapter: getSeriesAdapter,
            endpoint: TMDB_PATHS.series.popular
        },
        {
            name: 'Peliculas de Terror',
            request: getMovies,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.discover,
            endpoint_params: {
                params: {
                    with_genres: TMDB_PATHS.genres.terror
                }
            }
        },
        {
            name: 'Animes',
            request: getSeries,
            adapter: getSeriesAdapter,
            endpoint: TMDB_PATHS.series.discover,
            endpoint_params: {
                params: {
                    with_origin_country: TMDB_PATHS.region.japon
                }
            }
        }
    ]);
    const [genres, setGenres] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGenresMovies();
                setGenres(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    return (
        <>
            {error ?? (<h1>{error}</h1>)}
            {isLoading ? 
            (<h1>Cargando....</h1>) :
            (<>
                <ul style={{padding:'16px 32px', listStyle:'none', display:'flex', gap:'8px', overflow:'scroll'}}>
                    {genres?.map(genre => (
                        <li key={genre.id}>
                            <button style={{borderStyle:'none', borderRadius:'8px', padding:'4px 8px'}}>{genre.name}</button>
                        </li>
                    ))}
                </ul>
                <List 
                    list={list}
                    renderList={(carousel, index) => (
                        <Slider 
                            key={`${carousel.name}_${index}`}
                            carousel={carousel}
                        />
                    )}
                />
            </>)}
        </>
    );
};

export default Home;
