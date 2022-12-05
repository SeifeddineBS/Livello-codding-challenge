import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsActions } from "./store/details-slice";
import { favActions } from "./store/fav-slice";

const Movie = (props) => {
  const recentMovies = JSON.parse(localStorage.getItem("movies"));

  const dispatch = useDispatch();

  const Details = async (movie) => {
    dispatch(detailsActions.setShowDetails(true));
    dispatch(detailsActions.showDetails(movie));
  };

  const movie = useSelector((state) => state.details.movie);

  const addToFavs = (movie) => {
    dispatch(favActions.addToFavs(movie));
    setExistFavs(true);
  };
  const removeFromFavs = (movie) => {
    dispatch(favActions.removeFromFavs(movie));
    setExistFavs(false);
  };
  const favs = useSelector((state) => state.fav.itemsList);

  const [existFavs, setExistFavs] = useState();

  useEffect(() => {
    let exist = false;
    favs.forEach((element) => {
      if (element.imdbID === movie.imdbID) exist = true;
    });
    setExistFavs(exist);
  }, [movie, favs]);

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
          {!existFavs ? (
            <button
              className="btn btn-primary"
              onClick={() => addToFavs(movie)}
            >
              Add
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => removeFromFavs(movie)}
            >
              Remove from favorites
            </button>
          )}
        </div>
        {recentMovies ? (
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
