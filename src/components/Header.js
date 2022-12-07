import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { favActions } from "./store/fav-slice";
import { detailsActions } from "./store/details-slice";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = (props) => {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.fav.total); // get number of favorites store to show it in the corner
  const showFavs = useSelector((state) => state.fav.showFavs); // verify if favorites button is clicked or not to show favs
  const showDetails = useSelector((state) => state.details.showDetails);
  const movie = useSelector((state) => state.details.movie); // get movie clicked from the store

  const SetShowFav = (action) => {
    dispatch(detailsActions.setShowDetails(false)); // if a movie clicked  setShowDetails to set showDetails variable to true and show the favorites list

    dispatch(favActions.setShowFavs(action)); // if button clicked in the corner execute setShowFavs() to set showfavs variable to true and show the favorites list
  };

  const setShowDetails = (action) => {
    dispatch(favActions.setShowFavs(false)); // if button clicked in the corner execute setShowFavs() to set showfavs variable to true and show the favorites list

    dispatch(detailsActions.setShowDetails(action)); // if a movie clicked  setShowDetails to set showDetails variable to true and show the favorites list
  };

  return (
    <div>
      <header>
        <nav className="header-nav">
          <ul className="header-ul">
            <li>
              <div
                className="header-h2"
                style={{ fontFamily: "monospace", fontSize: "30px" }}
              >
                <input
                  className="form-control"
                  placeholder="Search"
                  value={props.value}
                  onChange={(event) => {
                    props.setInput(event.target.value); // update input value and get the new value in app component
                    props.setInputChanged(true); // update setChangedInput for the app component
                    SetShowFav(false); // if favs are shwoing and  input changed set it to false to show the serach result
                    setShowDetails(false); // if movie details are shwoing and  input changed set it to false to show the serach result
                  }}
                ></input>
              </div>
            </li>
            {showFavs && (
              <Typography variant="h4" gutterBottom>
                Favorites
              </Typography>
            )}
            {showDetails && (
              <Typography variant="h4" gutterBottom>
                Movie details : {movie.Title}
              </Typography>
            )}

            <Fab
              variant="extended"
              aria-label="like"
              onClick={() => {
                SetShowFav(true); // when favorites button clicked execute this function to show favs .
              }}
            >
              <h>{total} movies</h>

              <FavoriteIcon />
            </Fab>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
