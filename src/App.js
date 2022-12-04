import React, { useState, useEffect } from "react";
import Movies from "./components/Movies";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Movie from "./components/Movie";
import { useSelector } from "react-redux";

function App(props) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();

  const [input, setInput] = useState("");
  const [inputChanged, setInputChanged] = useState(false);
  const showFavs = useSelector((state) => state.fav.showFavs);

  const getMovieApi = async (input) => {
    const url = `http://www.omdbapi.com/?s=${input}&apikey=${process.env.REACT_APP_API_KEY}`;

    const data = await fetch(url);
    const dataJson = await data.json();

    if (dataJson.Search) {
      setMovies(dataJson.Search);
    }
  };

  useEffect(() => {
    getMovieApi(input);
  }, [input, movie]);


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

      {!showFavs && (
        <>
          {movie && !inputChanged ? (
            <>
              <Movie movie={movie} setMovie={setMovie} />
            </>
          ) : (
            <div className="container-fluid movie-app">
              <div className="row">
                <Movies
                  movies={movies}
                  setMovie={setMovie}
                  setInputChanged={setInputChanged}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
