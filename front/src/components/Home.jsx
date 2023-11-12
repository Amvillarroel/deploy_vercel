import React, { useEffect, useState } from 'react';
import { useMultifetch } from '../hooks/useMultiFetch';
import { getMovies } from '../services/getMovies';
import { getSeries } from '../services/getSeries';
import { getMovieAdapter } from '../adapters/getMovieAdapter';
import { getSeriesAdapter } from '../adapters/getSeriesAdapter';
import { getGenresMovies } from '../services/getGenresMovies';
import { TMDB_PATHS } from '../remote/TMDB_API';

const Home = () => {
  const { list, isLoading, error } = useMultifetch([
    {
      name: 'Proximas Peliculas',
      request: getMovies,
      adapter: getMovieAdapter,
      endpoint: TMDB_PATHS.movies.upcoming,
    },
    {
      name: 'Series Populares',
      request: getSeries,
      adapter: getSeriesAdapter,
      endpoint: TMDB_PATHS.series.popular,
    },
    {
      name: 'Peliculas de Terror',
      request: getMovies,
      adapter: getMovieAdapter,
      endpoint: TMDB_PATHS.movies.discover,
      endpoint_params: {
        params: {
          with_genres: TMDB_PATHS.genres.terror,
        },
      },
    },
    {
      name: 'Animes',
      request: getSeries,
      adapter: getSeriesAdapter,
      endpoint: TMDB_PATHS.series.discover,
      endpoint_params: {
        params: {
          with_origin_country: TMDB_PATHS.region.japon,
        },
      },
    },
  ]);

  const [genres, setGenres] = useState([]);

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
  }, []);

  return (
    <>
      {error ?? <h1>{error}</h1>}
      {isLoading ? (
        <h1>Cargando....</h1>
      ) : (
        <>
          <ul style={{ padding: '16px 32px', listStyle: 'none', display: 'flex', gap: '8px', overflow: 'scroll' }}>
            {genres?.map((genre) => (
              <li key={genre.id}>
                <button style={{ borderStyle: 'none', borderRadius: '8px', padding: '4px 8px' }}>{genre.name}</button>
              </li>
            ))}
          </ul>
          <section>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {list?.map((carousel, index) => (
                    <li key={`${carousel.name}_${index}`}>
                    <h1>{carousel.name}</h1>
                    <ul style={{ padding: '16px 32px', listStyle: 'none', display: 'flex', gap: '8px', overflow: 'scroll' }}>
                        {carousel?.results?.map((card) => (
                        <li key={card.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <img style={{ maxWidth: '125px' }} src={`${TMDB_PATHS.images_base_url}${card.poster}`} alt={card.title} />
                            <h3 style={{ margin: '0', fontSize: '20px' }}>{card.title}</h3>
                            {<p>{card.date}</p>}
                        </li>
                        ))}
                    </ul>
                    </li>
                ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
