import React, { useState, useEffect } from "react";

const Movies = (props) => {
  const details = async (movie) => {
    props.setMovie(movie);
    var existingMovies = JSON.parse(localStorage.getItem("movies") || "[]");

    existingMovies.forEach((element, index) => {
      if (element.imdbID === movie.imdbID) {
        existingMovies.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(existingMovies));
        var maxSize = 4;
      } else if (existingMovies.length == maxSize) {
        existingMovies.splice(0, 1);
      }
    });

    existingMovies.push(movie);
    localStorage.setItem("movies", JSON.stringify(existingMovies));
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
