import React from 'react';
import {Image} from "@nextui-org/react";
import { TMDB_PATHS } from '../../remote/TMDB_API';

const Cards = ({ card })=> {
    return (
        <li key={card.id}>
            <Image
                alt={card.title}
                className="object-cover opacity-1"
                src={`${TMDB_PATHS.images_base_url}${card.poster}`} 
                width={200}
            />
        </li>
        )
}

export { Cards };