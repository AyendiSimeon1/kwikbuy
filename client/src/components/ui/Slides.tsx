"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode } from 'swiper/modules';

export default function LogoSlider() {
    const logos = [
        '/hero/slider/paystack.png',
        '/hero/slider/mono.png',
        '/hero/slider/nomba.png',
        '/hero/slider/klasha.png',
        '/hero/slider/gene.png',
        '/hero/slider/indrive.png'
    ];

    return (
        <section className='bg-white py-8'>
            <h2 className='text-center text-2xl md:text-4xl font-bold mb-6'>
                Trusted by Leading Companies 
            </h2>
            <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={30}
                slidesPerView={5}
                freeMode={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                speed={3000} 
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40   
                    },
                }}
                className="mySwiper"
            >
                {[...logos, ...logos].map((logo, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <Image
                            src={logo} 
                            alt={`Partner logo ${index + 1}`} 
                            className='w-32 h-32 rounded-full object-contain'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
