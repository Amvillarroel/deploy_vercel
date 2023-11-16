import React from 'react';
import Card from 'react-bootstrap/Card';
import { TMDB_PATHS } from '../../remote/TMDB_API';

const Cards = ({ card })=> {
    return (
        <li key={card.id} style={{display:'flex', flexDirection:'column', gap:'8px'}}>
            <Card className="bg-dark text-white">
                <Card.Img src={`${TMDB_PATHS.images_base_url}${card.poster}`} alt={card.title} />
                <Card.ImgOverlay>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Link>Detalles</Card.Link>
                </Card.ImgOverlay>
            </Card>
        </li>
        )
}

export { Cards };