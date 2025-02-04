import React, { useEffect, useState } from 'react';
import MovieList from '../component/movie/MovieList';
import useSWR from 'swr';
import { fetcher } from '../config';
import MovieCard from '../component/movie/MovieCard';
import useDebounce from '../hooks/useDebounce';
import ReactPaginate from 'react-paginate';
// 'https://api.themoviedb.org/3/search/movie

const pageCount = 5;
//const itemsPerPage = 20;
const MoviePage = () => {
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=bb7f7490bd36f9ba5887d09d797437dd&page=
        ${nextPage}`)
    const filterDebounce = useDebounce(filter, 200)
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;
    useEffect(() => {
        if (filterDebounce) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=bb7f7490bd36f9ba5887d09d797437dd&query=
                ${filterDebounce}&page=${nextPage}`);
        }
        else {
            setUrl(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=bb7f7490bd36f9ba5887d09d797437dd&page=
                ${nextPage}`);
        }
    }, [filterDebounce, nextPage]);
    const movies = data?.results || [];

    return (
        <div className='py-10 page-contanier'>
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text"
                        className="w-full p-4 bg-slate-800 text-white outline-none rounded-xl"
                        placeholder='Type here to search ...' onChange={handleFilterChange} />
                </div>
                <button className='p-4 bg-primary text-white rounded'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>
            {loading && <div className='w-10 h-10 rounded-full border-4 border-primary border-t-transparent 
            border-t-4 mx-auto animate-spin'> </div>}
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies.length > 0 && movies.map(item => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>

            <div className="flex items-center justify-center mt-10 gap-x-5 text-white ">
                <span className='cursor-pointer' onClick={() => setNextPage(nextPage - 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                    </svg>
                </span>
                {new Array(pageCount).fill(0).map((item, index) => (
                    <button className='cursor-point inline-block p-2 px-3 leading-none rounded bg-white text-slate-900'
                        onClick={() => setNextPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}

                <span className='cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6"
                        onClick={() => setNextPage(nextPage + 1)}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default MoviePage;