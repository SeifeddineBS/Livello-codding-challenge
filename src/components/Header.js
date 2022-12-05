import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { favActions } from "./store/fav-slice";
import { detailsActions } from "./store/details-slice";

const Header = (props) => {
  const quantity = useSelector((state) => state.fav.totalQuantity);

  const dispatch = useDispatch();

  const SetShowFav = (action) => {
    dispatch(favActions.setShowFavs(action));
  };

  const setShowDetails = (action) => {
    dispatch(detailsActions.setShowDetails(action));
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
                    props.setInput(event.target.value);
                    props.setInputChanged(true);
                    SetShowFav(false);
                    setShowDetails(false);
                  }}
                ></input>
              </div>
            </li>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                SetShowFav(true);
              }}
            >
              <h2>{quantity} movies</h2>
            </button>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
