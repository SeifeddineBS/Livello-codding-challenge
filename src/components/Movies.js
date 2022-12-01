import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Movie from "./Movie";

const Movies = (props) => {
  const navigate = useNavigate();

  const details = async (movie) => {
    //navigate("/movie/" + imdbID);
    props.setMovie(movie);
   
  };

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="d-flex justify-content-start m-3">
          <img
            src={movie.Poster}
            alt="movie"
            onClick={() => details(movie)}
          ></img>
        </div>
      ))}
    </>
  );
};
export default Movies;
