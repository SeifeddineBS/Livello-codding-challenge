import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { favActions } from "./store/fav-slice";
import { detailsActions } from "./store/details-slice";

const Header = (props) => {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.fav.total); // get number of favorites store to show it in the corner

  const SetShowFav = (action) => {
    dispatch(favActions.setShowFavs(action)); // if button clicked in the corner execute setShowFavs() to set showfavs variable to true and show the favorites list
  };

  const setShowDetails = (action) => {
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
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                SetShowFav(true); // when favorites button clicked execute this function to show favs .
              }}
            >
              <h2>{total} movies</h2>
            </button>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
