import React from 'react';
import 'swiper/css';

const AppSwiper = ({carouselName, children}) => {
    return (
        <div>
            <h1 className="mb-2 text-4xl font-extrabold">{carouselName}</h1>
            <swiper-container
                slides-per-view="5"
                loop
            >
                {children}
            </swiper-container>
        </div>
    )
}

export { AppSwiper };