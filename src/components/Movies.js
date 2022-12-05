import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import { detailsActions } from "./store/details-slice";
import { favActions } from "./store/fav-slice";

const Movies = (props) => {
  const dispatch = useDispatch();

  const Details = async (movie) => {
    dispatch(detailsActions.setShowDetails(true));
    dispatch(detailsActions.showDetails(movie));
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
  const showDetails = useSelector((state) => state.details.showDetails);
  const showFavs = useSelector((state) => state.fav.showFavs);

  const addToFavs = (movie) => {
    dispatch(favActions.addToFavs(movie));
  };
  const removeFromFavs = (movie) => {
    dispatch(favActions.removeFromFavs(movie));
  };

  const favs = useSelector((state) => state.fav.itemsList);

  function MovieExistFav(movie) {
    let exist = false;
    favs.forEach((element) => {
      if (element.imdbID === movie.imdbID) {
        exist = true;
      }
    });

    return exist;
  }
  return (
    <>
      {showDetails ? (
        <Movie />
      ) : (
        <div className="row">
          {showFavs && <h1>Favorites :</h1>}
          {showFavs && favs.length === 0 && <h1>Not found </h1>}

          {props.movies.map((movie, index) => (
            <div key={movie.imdbID} className="col-md-3 col-sm-6 mb-4">
              <img
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => Details(movie)}
              ></img>
              <h4>
                {movie.Title} - {movie.Year}
                {MovieExistFav(movie) ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => removeFromFavs(movie)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => addToFavs(movie)}
                  >
                    Add
                  </button>
                )}
              </h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Movies;
