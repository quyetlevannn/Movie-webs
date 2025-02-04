import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const MovieCard = ({ item }) => {
    const {
        title,
        vote_average,
        release_date,
        poster_path,
        id,
    } = item;
    const navigate = useNavigate();
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 h-full select-none">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
                className='w-full h-[250px] object-cover rounded-lg mb-5'
            />

            <div className="flex flex-col flex-1">
                <h3 className='text-white text-xl font-bold mb-10'>
                    {title}
                </h3>
                <div className="flex items-center justify-between text-yellow-100 text-sm opacity-50 mb-1">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>
                <button
                    onClick={() => navigate(`/movie/${id}`)}
                    className='py-3 px-6 rounded-lg bg-purple-400 text-white font-medium w-full mt-auto'>
                    Watch Now
                </button>
            </div>
        </div>
    );
};

export default MovieCard;