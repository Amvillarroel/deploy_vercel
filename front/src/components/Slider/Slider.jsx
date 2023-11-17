import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {Cards} from '../Cards/Cards'

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
                            {item.map((card, index) => (
                               <Cards key={index} card={card}></Cards> //componente Cards para reutilizar
                            ))}
                        </ul>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export { Slider };