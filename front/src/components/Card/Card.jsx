import React from 'react';
import { TMDB_PATHS } from '../../remote/TMDB_API'

const Card = ({ title, poster_path, date }) => {
    return (
        <li style={{display:'flex', flexDirection:'column', gap:'8px'}}>
            <img style={{maxWidth:'125px'}} src={`${TMDB_PATHS.images_base_url}${poster_path}`} alt={title} />
            <h3 style={{margin:'0', fontSize:'20px'}}>{title}</h3>
            {<p>{date}</p>}
        </li>
    )
}

export { Card };