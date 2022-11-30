import React, { useState, useEffect } from "react";
import Movies from "./components/Movies";
import SearchInput from "./components/SearchInput";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const getMovieApi = async (input) => {
    const url = `http://www.omdbapi.com/?s=${input}&apikey=${process.env.REACT_APP_API_KEY}`;

    const data = await fetch(url);
    const dataJson = await data.json();
    console.log("url: " + url);

    console.log(dataJson.Search);
    if (dataJson.Search) setMovies(dataJson.Search);
  };
  useEffect(() => {
    getMovieApi(input);
  }, [input]);

  return (
    <div className="container-fluid movie-app">
      <div className="row">
        <SearchInput input={input} setInput={setInput} />
      </div>
      <div className="row">
        <Movies movies={movies} />
      </div>
    </div>
  );
}

export default App;
