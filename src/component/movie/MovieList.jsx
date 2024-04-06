import React from 'react';
import "swiper/scss";
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetcher } from '../../config';

//https://api.themoviedb.org/3/movie/now_playing?api_key=AIzaSyCkbLjYMeDrMcQcbOabtYHNZ1teeX6GVAQ
//'https://api.themoviedb.org/3/movie/top_rated?
const MovieList = ({ type = "now_playing" }) => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=bb7f7490bd36f9ba5887d09d797437dd`,
        fetcher);
    const movies = data?.results || [];

    return (
        <div>
            <div className="movie-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {movies.length > 0 && movies.map(item => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MovieList;