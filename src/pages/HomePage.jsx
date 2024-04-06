import React, { Fragment } from 'react';
import MovieList from '../component/movie/MovieList';

const HomePage = () => {
    return (
        <Fragment>
            <section className='movies-layout page-container mb-20'>
                <h2 className='flex capitalize text-white mb-5 text-3xl font-bold mt-10'>
                    Now playing
                </h2>
                <MovieList></MovieList>
            </section>

            <section className='movies-layout page-container mb-20'>
                <h2 className='flex capitalize text-white mb-5 text-3xl font-bold'>
                    Top Rated
                </h2>
                <MovieList type='top_rated'></MovieList>
            </section>

            <section className='movies-layout page-container mb-20 '>
                <h2 className='flex capitalize text-white mb-5 text-3xl font-bold'>
                    Trending
                </h2>
                <MovieList type='upcoming'></MovieList>
            </section>
        </Fragment>
    );
};

export default HomePage;