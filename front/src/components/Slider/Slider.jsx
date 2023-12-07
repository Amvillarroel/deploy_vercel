import React from 'react';
import {Cards} from '../Cards/Cards';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const Slider = ({carousel}) => {
    return (
        <>
            <h1 style={{color:'white'}}>{carousel.name}</h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                className="mySwiper"
            >
                {carousel.results.map((card, index) => (
                    <SwiperSlide key={index}>
                        <Cards card={card}></Cards>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export { Slider };