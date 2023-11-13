import React, { useState } from 'react'
import { TMDB_PATHS } from '../../remote/TMDB_API';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

const Slider = ({carousel}) => {
    const carouselCopy = structuredClone(carousel);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    };
    const group = (array, maxItems) => {
        const finalArray =[];
        let subArray = [];
        array.forEach((item, index) => {
            subArray.push(item);
            if (subArray.length === maxItems || index === (array.length - 1)) {
                finalArray.push(subArray);
                subArray = [];
            };
        });
        return finalArray;
    }
    const groupResult = group(carouselCopy.results, 4);
    return (
        <>
            <h1>{carousel.name}</h1>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {groupResult.map((item, index) => (
                    <Carousel.Item key={index}>
                        <ul style={{display:'flex', justifyContent:'space-around', alignItems:'center', gap:'16px'}}>
                            {item.map(card => (
                                <li key={card.id} style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                                    <Card className="bg-dark text-white">
                                        <Card.Img src={`${TMDB_PATHS.images_base_url}${card.poster}`} alt={card.title} />
                                        <Card.ImgOverlay>
                                            <Card.Title>{card.title}</Card.Title>
                                            <Card.Link>Detalles</Card.Link>
                                        </Card.ImgOverlay>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export { Slider };