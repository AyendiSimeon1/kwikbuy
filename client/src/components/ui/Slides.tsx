"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';

export default function LogoSlider () {
    const logos = [
        '/logos/company1.png',
        '/logos/company2.png',
        '/logos/company3.png',
        '/logos/company4.png',
        '/logos/company5.png',
        '/logos/company6.png',
        '/logos/company7.png',
        '/logos/company8.png',
    ];



    return (
        <section className='bg-white py-8'>
            <h2 className='text-center text-2xl md: text-4xl font-bold mb-6'>
                Trusted by Leading Companies 
            </h2>
            <Swiper
                spaceBetween={50}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                breakpoints = {{
                    640 : {
                        slidesPerView : 2,
                        spaceBetween : 20
                    },
                    768: {
                        slidesPerView : 3,
                    },
                    1024 : {
                        slidesPerView : 4,
                        spaceBetween : 40   
                    },

                }}
                >
                    {logos.map((logo) => (
                        <SwiperSlide key={logo}>
                            <img src={logo} alt='' className='w-32 h-32 rounded-full' />
                        </SwiperSlide>
                    ))}
                </Swiper>
        </section>
    );
}