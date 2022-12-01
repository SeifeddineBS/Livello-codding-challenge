import React, { useState, useEffect } from "react";
import Movies from "./components/Movies";
import SearchInput from "./components/SearchInput";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";

function App(props) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();

  const [input, setInput] = useState("");

  const getMovieApi = async (input) => {
    const url = `http://www.omdbapi.com/?s=${input}&apikey=${process.env.REACT_APP_API_KEY}`;

    const data = await fetch(url);
    const dataJson = await data.json();

    if (dataJson.Search) {
      setMovies(dataJson.Search);

      //setClicked(false);
    }
  };

  useEffect(() => {
    getMovieApi(input);
  }, [input, movie]);

  return (
    <div>
      <div className="container-fluid movie-app">
        <div className="row">
          <SearchInput input={input} setInput={setInput} />
        </div>
      </div>
      {movie ? (
        <>{movie && <Movie movie={movie} setMovie={setMovie} />}</>
      ) : (
        <div className="container-fluid movie-app">
          <div className="row">
            <Movies movies={movies} setMovie={setMovie} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
