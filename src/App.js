import React, { useEffect, useState } from 'react';
import MovieBox from './components/MovieBox'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Heading from './components/Heading';


const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=28b7a9c29304fa85edad13a44481f8c0"


function App() {
  const [movies, setMovies] = useState([]);
  const [recentViewed, setRecentViewed] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        setMovies(data.results)
      })
  }, [])

  const movSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) return

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=28b7a9c29304fa85edad13a44481f8c0&include_adult=false&query=${searchValue}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);

    } catch (e) {
      console.log(e);
    }
  }

  const addRecentMovie = (movie) => {
    const newRecentList = [...recentViewed, movie];
    setRecentViewed(newRecentList);
  }


  const changeHandler = (e) => { setSearchValue(e.target.value) }

  return (
    <>
      <Navbar bg="black" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">TMDB React Course Submission <img id="logo" src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg" alt="small-logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className='me-auto my-2 my-lg-3' navbarScroll></Nav>
            <Form className='d-flex' onSubmit={movSearch}>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='search'
                name="query"
                value={searchValue} onChange={changeHandler}>
              </FormControl>
              <Button variant='primary' type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='moviesheader'>
        <Heading heading='Movies' />
        <MovieBox movies={movies} handleRecentClick={addRecentMovie} />
      </div>
      <div className='moviesheader'>
        <Heading heading='Recently viewed' />
        <MovieBox movies={recentViewed} handleRecentClick={addRecentMovie} />
      </div>
    </>
  );
};

export default App;
