import React from 'react'
import { Cards } from '../../Cards/Cards'

const SwiperSlide = ({carouselResults}) => {
    return (
        <>
            {carouselResults?.map((card, index) => (
                <swiper-slide key={index}>
                    <Cards card={card}></Cards>
                </swiper-slide>
            ))}
        </>
    )
}

export { SwiperSlide }