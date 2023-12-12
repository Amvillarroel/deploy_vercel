import React from 'react'
import { useMultifetch } from '../hooks/useMultiFetch';
import { getMovies } from '../services/getMovies';
import { getSeries } from '../services/getSeries';
import { getMovieAdapter } from '../adapters/getMovieAdapter';
import { getSeriesAdapter } from '../adapters/getSeriesAdapter';
import { TMDB_PATHS } from '../remote/TMDB_API';
import { List } from './List/List';
import { AppSwiper } from './app_swiper/app_swiper';
import { SwiperSlide } from './app_swiper/swiper_slide/swiper_slide';
import { AppBanner } from './app_banner/app_banner';

const Home = () => {
    // Peticion para el banner
    const {list: bannerData, isLoading: bannerLoading, error: bannerError} = useMultifetch([
        {
            name: 'Proximas Peliculas',
            request: getMovies,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.upcoming
        }
    ])
    // Peticiones para mostrar carruseles
    const { list, isLoading, error } = useMultifetch([
        {
            name: 'Peliculas Populares',
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
    return (
        <>
            {(error || bannerError) ?? (<h1>{error}</h1>)}
            {(isLoading || bannerLoading) ? 
            (<h1>Cargando....</h1>) :
            (<>
                <AppBanner bannerData={bannerData}/>
                <List 
                    list={list}
                    renderList={(carousel, index) => (
                        <AppSwiper key={`${carousel.name}_${index}`} carouselName={carousel.name} >
                            <SwiperSlide carouselResults={carousel.results}></SwiperSlide>
                        </AppSwiper>
                    )}
                />
            </>)}
        </>
    );
};

export default Home;
