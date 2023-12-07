import React from 'react';
import {Cards} from '../Cards/Cards';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const Slider = ({carousel}) => {
    return (
        <div>
            <h1 className="mb-2 text-4xl font-extrabold">{carousel.name}</h1>
            <Swiper
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 320px
                    "320": {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 10
                    },
                    // when window width is >= 800px
                    800: {
                        slidesPerView: 5,
                        spaceBetween: 10
                    },
                    // when window width is >= 960px
                    960: {
                        slidesPerView: 6,
                        spaceBetween: 10
                    },
                    // when window width is >= 1,120px
                    1120: {
                        slidesPerView: 7,
                        spaceBetween: 10
                    },
                }}
            >
                {carousel.results.map((card, index) => (
                    <SwiperSlide key={index}>
                        <Cards card={card}></Cards>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export { Slider };