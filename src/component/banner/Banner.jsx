import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import "swiper/scss";
import { SwiperSlide, Swiper } from 'swiper/react'

const Banner = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=bb7f7490bd36f9ba5887d09d797437dd`,
        fetcher);
    const movies = data?.results || [];
    return (
        <section className='banner h-[800px] page-container mb-20 overflow-hidden'>
            <Swiper grabCursor="true" slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem>
                            item= {item}
                        </BannerItem>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
};

function BannerItem(item) {
    const { title, poster_path } = item.children[1];
    return (
        <div className='w-full h-full rounded-lg relative'>
            <div className='overlay absolute inset-0 rounded-lg bg-opacity-70'>
            </div>
            <img
                src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                // src={`https://image.tmdb.org/t/p/w500+${item.children[1].poster_path}`}
                alt=""
                className='w-full h-full object-cover rounded-lg'
            />
            <div className='absolute left-5 bottom-5 w-full'>
                <h2 className='font-bold text-3xl mb-3 text-left text-white'>{title}</h2>
                <div className='flex flex-col gap-y-3 '>
                    <div className='flex items-center gap-x-3 mb-5 text-white'>
                        <span className='py-2 px-4 border border-white rounded-md'>Adventure</span>
                        <span className='py-2 px-4 border border-white rounded-md'>Adventure</span>
                        <span className='py-2 px-4 border border-white rounded-md'>Adventure</span>
                    </div>
                    <div className='flex justify-start'>
                        <button className='py-2 px-6 rounded-lg bg-purple-400 text-white font-medium '>
                            Watch Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;