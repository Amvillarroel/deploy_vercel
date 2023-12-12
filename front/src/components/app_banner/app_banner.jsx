import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { TMDB_PATHS } from '../../remote/TMDB_API';
import './app_banner.css'
import { Button } from '@nextui-org/react';

const AppBanner = ({bannerData}) => {
    const default_text = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sollicitudin pharetra cursus montes vulputate integer, lacus scelerisque eu bibendum turpis aliquam. Non facilisi dictum interdum nam himenaeos sapien primis orci tristique dui, nunc cras viverra varius duis netus nisi lectus conubia eu parturient, habitasse nec scelerisque sodales consequat purus pellentesque metus tincidunt. Rhoncus molestie scelerisque massa hendrerit metus sem dictumst curabitur, netus cras quisque eleifend mollis pretium odio sed eget, varius ligula morbi rutrum litora ornare tincidunt."
    if (bannerData) {
        const { results } = bannerData[0];
        const newArray = Array.from({ length: 5 }, () => results[Math.floor(Math.random() * results.length)]);

        return (
            <>
                <Swiper
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {newArray?.map((movie, index) => (
                        <SwiperSlide
                            key={index}
                            className='custom-slide min-h-[75vh] bg-cover bg-center relative'
                            style={{
                                backgroundImage: `url(${TMDB_PATHS.images_base_url}${movie.backdrop})`,
                            }}
                        >
                            <section className='py-16 px-8 absolute z-10 max-w-[50vw] flex flex-col	gap-4'>
                                <h1 className='text-4xl font-bold'>{movie.title}</h1>
                                <p className='line-clamp-4'>{movie.overview || default_text}</p>
                                <p className='text-sm'>Fecha de estreno:
                                    <span className='font-bold'> {movie.date}</span>
                                </p>
                                <div className='flex gap-3'>
                                    <Button color="primary" className='bg-blue-500'>Trailer</Button>
                                    <Button color="danger">Detalles</Button>
                                </div>
                            </section>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        );
    } else {
        return null; // O manejar de alguna manera cuando bannerData no está definido o es un array vacío
    }
}

export { AppBanner }