import { Button } from 'react-bootstrap';

const API_IMG = "https://image.tmdb.org/t/p/w500/";
const API_REDIRECT = "https://www.themoviedb.org/movie/";

const MovieBox = (props) => {

  return (
    <>
      <div className='container'>
        {props.movies.map((movie) =>
          <div className='grid'>
            <div className='card-body'>
              <img className="movie-cover" src={API_IMG + movie.poster_path} alt="movieposter" />
              <Button id='button' type='button' href={`${API_REDIRECT}` + `${movie.id}`} target="_blank" onClick={() => props.handleRecentClick(movie)}>Read more</Button>
              <div className='hidden'>
                <h6>{movie.title}</h6>
                <p>⭐ Rating: {movie.vote_average} / 10.0</p>
                <p>📈 Vote count: {movie.vote_count}</p>
                <p>📆 Released: {movie.release_date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MovieBox;
