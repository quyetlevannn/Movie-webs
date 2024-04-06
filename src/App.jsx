import { Fragment } from 'react'
import './App.css'
import MovieCard from './component/movie/MovieCard'
import MovieList from './component/movie/MovieList'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import "swiper/scss";
import Main from './component/layout/Main'
import HomePage from './pages/HomePage'
import Banner from './component/banner/Banner'
import MoviePage from './pages/MoviePage'
import MovieDetailspage from './pages/MovieDetailspage'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Main> </Main>}>
          <Route path='/' element={
            <>
              <Banner></Banner>
              <HomePage></HomePage>
            </>
          }>
          </Route>
          <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
          <Route path='/movie/:movieId' element={<MovieDetailspage></MovieDetailspage>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App
