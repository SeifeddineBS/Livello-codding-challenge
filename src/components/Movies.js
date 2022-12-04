import React from "react";
import { useDispatch } from "react-redux";
import { favActions } from "./store/fav-slice";

const Movies = (props) => {
  const details = async (movie) => {
    props.setMovie(movie);
    props.setInputChanged(false);

    var existingMovies = JSON.parse(localStorage.getItem("movies") || "[]");

    existingMovies.forEach((element, index) => {
      if (element.imdbID === movie.imdbID) {
        existingMovies.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(existingMovies));
        var maxSize = 4;
      } else if (existingMovies.length === maxSize) {
        existingMovies.splice(0, 1);
      }
    });

    existingMovies.push(movie);
    localStorage.setItem("movies", JSON.stringify(existingMovies));
  };

  const dispatch = useDispatch();
  const addToFavs = (movie) => {
    dispatch(favActions.addToFavs(movie));
  };

  return (
    <>
      <div className="row">
        {props.movies.map((movie, index) => (
          <div key={movie.imdbID} className="col-md-3 col-sm-6 mb-4">
            <img
              src={movie.Poster}
              alt={movie.Title}
              onClick={() => details(movie)}
            ></img>
            <h4>
              {movie.Title} - {movie.Year}
              <button
                className="btn btn-primary"
                onClick={() => addToFavs(movie)}
              >
                Add
              </button>
            </h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Movies;
