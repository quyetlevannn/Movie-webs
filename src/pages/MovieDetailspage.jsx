import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { apiKey, fetcher } from '../config';
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard from '../component/movie/MovieCard';
//https://api.themoviedb.org/3/movie/movie_id?
//'https://api.themoviedb.org/3/movie/movie_id/credits?

const MovieDeailtspage = () => {
    const { movieId } = useParams()
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
        fetcher);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;

    return (
        <div className='py-10 '>
            <div className='w-full h-[800px] relative'>
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="w-full h-full bg-cover bg-no-repeat rounded"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`
                    }}>

                </div>
            </div>
            <div className="w-full h-[500px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-2">
                <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    className='w-full h-full object-cover rounded-xl'
                    alt="" />
            </div>
            <h1 className='text-center text-3xl font-bold text-white mb-10 mt-10'>
                {title}
            </h1>
            {genres.length > 0 && (<div className="flex items-center gap-x-5 mb-10 justify-center">
                {genres.map(item => (
                    <span className='py-2 px-4 border-primary text-primary border rounded'
                        key={item.id}>{item.name}</span>
                ))}
            </div>)}
            <p className='text-center leading-relaxed max-w-[600px] mx-auto mb-10'>
                {overview}
            </p>
            <MovieCredits></MovieCredits>
            <MovieVideos></MovieVideos>
            <MoviesSimilar></MoviesSimilar>
        </div>
    );
};
function MovieCredits() {
    //'https://api.themoviedb.org/3/movie/movie_id/credits?
    const { movieId } = useParams()
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
        fetcher);
    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
        <div className='py-10'>
            <h2 className='text-center text-2xl mb-10'>Casts</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.splice(0, 4).map(item => (
                    <div className="cast-item" key={item.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                            className='w-full h-[350px] object-cover rounded-lg mb-3'
                            alt="" />
                        <h3 className='text-xl font-medium'>{item.name}</h3>
                    </div>
                ))}

            </div>
        </div>
    )
}

function MovieVideos() {
    const { movieId } = useParams()
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
        fetcher);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className='py-10 '>
            <div className='flex flex-col gap-20'>
                {results.slice(0, 2).map((item) => (
                    <div className='' key={item.id}>
                        <h3 className='flex mb-5 text-xl font-medium text-white p-3 bg-secondary rounded'>
                            {item.name}
                        </h3>
                        <div key={item.id} className='w-full aspect-video'>
                            <iframe
                                width="600" height="400"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="[MIXTAPE] NHẠC KHÔNG THỊ TRƯỜNG VOL.1 - AUTHENTIC FIX「THÁI HOÀNG REMIX」- NHẠC NGOẠI HOT TIKTOK 2023"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className='w-full h-full object-fill'
                            >
                            </iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
function MoviesSimilar() {
    const { movieId } = useParams()
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
        fetcher);
    if (!data) return null;
    console.log(data);
    if (!data) return null;
    const { results } = data;
    if (!results || results <= 0) return null;
    return (
        <div className='py-10'>
            <h2 className='text-3xl font-medium mb-10 flex'>Smilar movies</h2>
            <div className="movie-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {results.length > 0 && results.map(item => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
export default MovieDeailtspage;
