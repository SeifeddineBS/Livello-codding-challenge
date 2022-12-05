import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsActions } from "./store/details-slice";
import { favActions } from "./store/fav-slice";

const Movie = (props) => {
  const dispatch = useDispatch();
  const [existFavs, setExistFavs] = useState(); // variable to know if this movie exist in the favorites list or not .

  const favs = useSelector((state) => state.fav.itemsList); // get all favorites from store
  const movie = useSelector((state) => state.details.movie); // get movie clicked from the store

  const recentMovies = JSON.parse(localStorage.getItem("movies")); // get recent movies from local storage

  const Details = async (movie) => {
    // when clicked to details go to movie details
    dispatch(detailsActions.setShowDetails(true)); // let the variable to true to know that a movie is clicked and show it
    dispatch(detailsActions.showDetails(movie)); // update the movie clicked
  };

  const addToFavs = (movie) => {
    // add a movie to favorite
    dispatch(favActions.addToFavs(movie));
    setExistFavs(true);
  };
  const removeFromFavs = (movie) => {
    // remove a movie from favorite
    dispatch(favActions.removeFromFavs(movie));
    setExistFavs(false);
  };

  useEffect(() => {
    // use Effect to veify every movie clicked if it is in favorite list .
    let exist = false;
    favs.forEach((element) => {
      if (element.imdbID === movie.imdbID) exist = true;
    });
    setExistFavs(exist);
  }, [movie, favs]); // every time when a movie or favs changed this function exectued again .

  return (
    <>
      <div className="container">
        <h1 className="my-4">{movie.Title}</h1>

        <div className="row">
          <div className="col-md-8">
            <img className="img-fluid" src={movie.Poster} alt=""></img>
          </div>

          <div className="col-md-4">
            <h1 className="my-3">Type : {movie.Type}</h1>

            <h1 className="my-3">Year : {movie.Year}</h1>
          </div>
          {!existFavs ? ( // if movie dont exist in the favs
            <button
              className="btn btn-primary"
              onClick={() => addToFavs(movie)}
            >
              Add
            </button>
          ) : (
            // if movie  exist in the favs
            <button
              className="btn btn-primary"
              onClick={() => removeFromFavs(movie)}
            >
              Remove from favorites
            </button>
          )}
        </div>
        {recentMovies ? ( // if recent movies exist show them from storage
          <>
            <h3 className="my-4">Recents</h3>

            <div className="row">
              {recentMovies.reverse().map((movie, index) => (
                <div key={movie.imdbID} className="col-md-3 col-sm-6 mb-4">
                  <img
                    className="img-fluid"
                    src={movie.Poster}
                    alt=""
                    onClick={() => Details(movie)}
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
