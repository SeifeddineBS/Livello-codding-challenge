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

  const [input, setInput] = useState(""); // input value from SearchInput component

  const [inputChanged, setInputChanged] = useState(false); // verify if the input value changed  from Header component
  const showFavs = useSelector((state) => state.fav.showFavs); // verify if favorites button is clicked or not to show favs
  const favs = useSelector((state) => state.fav.itemsList); // get all favs from redux store
  const stateMovies = useSelector((state) => state.movies.movies); // get all movies after research

  useEffect(() => {
    const GetMovieApi = async (input) => {
      const url = `http://www.omdbapi.com/?s=${input}&apikey=${process.env.REACT_APP_API_KEY}`; // get input from Header component and the key from .env

      const data = await fetch(url);
      const dataJson = await data.json(); // get data from the api
      dispatch(moviesActions.allMovies(dataJson)); // store the data in the movies store

      if (dataJson.Search) {
        setMovies(stateMovies);
      }
    };
    GetMovieApi(input); // call GetMovieApi and put it in the useEffect to change dynamically when variable in the array change
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
            // show favs false means that we are showing the movies after the input was changed so we are displaying movies list not favorites
            // open movies components with movies variable which contains all the movies found
            <div className="container-fluid movie-app">
              <div className="row">
                <Movies movies={movies} />
              </div>
            </div>
          )}
        </>
      ) : (
        // open movies components with favorites variable which contains all the favorites from the store 
        <Movies movies={favs} />
      )}
    </div>
  );
}

export default App;
