import React, { useState, useEffect } from "react";

const Movie = (props) => {
  const [recentMovies, setRecentMovies] = useState(
    JSON.parse(localStorage.getItem("movies"))
  );
  const goToMovie = (movie) => {
    props.setMovie(movie);
  };
  useEffect(() => {}, [props]);

  return (
    <>
      <div className="container">
        <h1 className="my-4">{props?.movie.Title}</h1>

        <div className="row">
          <div className="col-md-8">
            <img className="img-fluid" src={props?.movie.Poster} alt=""></img>
          </div>

          <div className="col-md-4">
            <h1 className="my-3">Type : {props?.movie.Type}</h1>

            <h1 className="my-3">Year : {props?.movie.Year}</h1>
          </div>
        </div>
        {recentMovies ? (
          <>
            <h3 className="my-4">Recents</h3>

            <div className="row">
              {recentMovies.reverse().map((movie, index) => (
                <div className="col-md-3 col-sm-6 mb-4">
                  <img
                    className="img-fluid"
                    src={movie.Poster}
                    alt=""
                    onClick={() => goToMovie(movie)}
                  ></img>
                  <h4>
                    {movie.Title} - {movie.Year}
                  </h4>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Movie;
