import React from 'react'
import { useMultifetch } from '../hooks/useMultifetch';
import { getMovies } from '../services/getMovies';
import { getSeries } from '../services/getSeries';
import { getAnimes } from '../services/getAnimes';
import { getMovieAdapter } from '../adapters/getMovieAdapter';
import { getSeriesAdapter } from '../adapters/getSeriesAdapter';

const Home = () => {
    const { list, isLoading, error } = useMultifetch([
        {
            name: import.meta.env.VITE_API_MOVIES_ENDPOINT_TITLE,
            request: getMovies,
            adapter: getMovieAdapter
        },
        {
            name: import.meta.env.VITE_API_SERIES_ENDPOINT_TITLE,
            request: getSeries,
            adapter: getSeriesAdapter
        },
        {
            name: import.meta.env.VITE_API_ANIMES_ENDPOINT_TITLE,
            request: getAnimes,
            adapter: getSeriesAdapter
        }
    ]);
    return (
        <>
            {error ?? (<h1>{error}</h1>)}
            {isLoading ? 
            (<h1>Cargando....</h1>) :
            (<section style={{padding:'16px 32px', display:'flex', flexDirection:'column', gap:'32px'}}>
                {list?.map((listElement, index) => (
                    <article key={index}>
                        <h2>{listElement?.name}</h2>
                        <ul style={{listStyle:'none', height:'400px', display:'flex', gap:'32px', overflow:'scroll'}}>
                            {listElement?.results?.map(item => (
                                <li key={item?.id} style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                                    <img style={{maxWidth:'125px'}} src={`https://image.tmdb.org/t/p/w500${item?.poster}`} alt={item?.title} />
                                    <h3 style={{margin:'0', fontSize:'20px'}}>{item?.title}</h3>
                                    {<p>{item?.date}</p>}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
            )}
        </>
    )
}

export default Home;