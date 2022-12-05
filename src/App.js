import React, { useState, useEffect } from "react";
import Movies from "./components/Movies";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "./components/store/movies-slice";

function App(props) {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);

  const [input, setInput] = useState("");

  const [inputChanged, setInputChanged] = useState(false);
  const showFavs = useSelector((state) => state.fav.showFavs);
  const favs = useSelector((state) => state.fav.itemsList);
  const stateMovies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    const GetMovieApi = async (input) => {
      const url = `http://www.omdbapi.com/?s=${input}&apikey=${process.env.REACT_APP_API_KEY}`;

      const data = await fetch(url);
      const dataJson = await data.json();
      dispatch(moviesActions.allMovies(dataJson));

      if (dataJson.Search) {
        setMovies(stateMovies);
      }
    };
    GetMovieApi(input);
  }, [dispatch, stateMovies, input]);

  return (
    <div>
      <div className="container-fluid movie-app">
        <div className="row">
          <Header
            input={input}
            setInput={setInput}
            setInputChanged={setInputChanged}
          />
        </div>
      </div>

      {!showFavs ? (
        <>
          {!inputChanged ? (
            <></>
          ) : (
            <div className="container-fluid movie-app">
              <div className="row">
                <Movies movies={movies} />
              </div>
            </div>
          )}
        </>
      ) : (
        <Movies movies={favs} />
      )}
    </div>
  );
}

export default App;
