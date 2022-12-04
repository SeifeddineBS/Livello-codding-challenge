import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { favActions } from "./store/fav-slice";

const FavoriteList = (props) => {
  const favs = useSelector((state) => state.fav.itemsList);

  const dispatch = useDispatch();
  dispatch(favActions.setShowFavs(true));

  const removeFromFavs = (movie) => {
    dispatch(favActions.removeFromFavs(movie));
  };

  return (
    <>
      {favs && (
        <div className="row">
          <h1>Favorites : </h1>

          {favs.map((movie, index) => (
            <div key={movie.imdbID} className="col-md-3 col-sm-6 mb-4">
              <img src={movie.poster} alt={movie.title}></img>
              <h4>
                {movie.title} - {movie.year}
              </h4>
              <button
                className="btn btn-primary"
                onClick={() => removeFromFavs(movie)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FavoriteList;
