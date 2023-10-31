import React, { useState, useEffect } from 'react'
import {getMovies} from '../services/getMovies';

const Home = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const popular_movies = await getMovies();
            setData(popular_movies.data.results);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        
    }, []);
    return (
        <>
            <section>
                <h1>Peliculas Populares</h1>
                <ul style={{listStyle:'none'}}>
                    {data.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <img style={{maxWidth:'125px'}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                        {<p>{item.release_date}</p>}
                        {<p>{item.overview}</p>}
                    </li>))}
                </ul>
            </section>
        </>
        
    )
}

export default Home;