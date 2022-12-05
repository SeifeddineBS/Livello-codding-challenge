import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import { detailsActions } from "./store/details-slice";
import { favActions } from "./store/fav-slice";

const Movies = (props) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies); // get all movies stored  after research
  const favs = useSelector((state) => state.fav.itemsList); // get all favs from redux store
  const showFavs = useSelector((state) => state.fav.showFavs); // verify if favorites button is clicked or not to show favs
  const showDetails = useSelector((state) => state.details.showDetails); // get if a movie is clicked or not to show it
  const existingMovies = JSON.parse(localStorage.getItem("movies") || "[]"); // movies from local storage

  function addMovieToRecentMovies(movie) {
    // add a movie after clicked to recent movies in the storage
    existingMovies.forEach((element, index) => {
      var maxSize = 4; // set the max size of movies to be shown

      // verify if the movie exist

      if (element.imdbID === movie.imdbID) {
        // if the movie exist delete it and push it again to be the first one in the array
        existingMovies.splice(index, 1);
      } 
       if (existingMovies.length === maxSize) {
        existingMovies.splice(0, 1); // delete the last movie if max size attended 
      }
    });

    existingMovies.push(movie); // push movie to list
    localStorage.setItem("movies", JSON.stringify(existingMovies)); // set the new array to storage
  }

  const Details = async (movie) => {
    // when clicked to details go to movie details

    dispatch(detailsActions.setShowDetails(true)); // let the variable to true to know that a movie is clicked and show it
    dispatch(detailsActions.showDetails(movie)); // update the movie clicked
    addMovieToRecentMovies(movie);
  };

  const addToFavs = (movie) => {
    // add a movie to favorite

    dispatch(favActions.addToFavs(movie));
  };
  const removeFromFavs = (movie) => {
    // remove a movie from favorite

    dispatch(favActions.removeFromFavs(movie));
  };

  function MovieExistFav(movie) {
    // verify  if the movie is in the favorite list or not

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
        <Movie /> // if movie details clicekd
      ) : (
        <div className="row">
          {showFavs && favs.length === 0 && <h1>Not found </h1>}
          {showFavs ? ( // if favorites button is clicked
            <>
              <h1>Favorites :</h1>
              {favs.map((movie, index) => (
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
            </>
          ) : (
            movies && (
              <>
                {movies.map((movie, index) => (
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
              </>
            )
          )}
        </div>
      )}
    </>
  );
};
export default Movies;
