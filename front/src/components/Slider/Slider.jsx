import React, { useState } from 'react'
<<<<<<< HEAD
import Carousel from 'react-bootstrap/Carousel';
import {Cards} from '../Cards/Cards'
=======
import { TMDB_PATHS } from '../../remote/TMDB_API';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
>>>>>>> 245610d79877fd2526e9aba04759451a0ebdfd39

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
<<<<<<< HEAD
                            {item.map((card, index) => (
                               <Cards key={index} card={card}></Cards> //componente Cards para reutilizar
=======
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
>>>>>>> 245610d79877fd2526e9aba04759451a0ebdfd39
                            ))}
                        </ul>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export { Slider };