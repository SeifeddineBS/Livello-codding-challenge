import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchInput.css";
import FavoriteList from "./FavoriteList";
import { favActions } from "./store/fav-slice";

const Header = (props) => {
  const quantity = useSelector((state) => state.fav.totalQuantity);
  const showFavsList = useSelector((state) => state.fav.showFavs);

  useEffect(() => {}, [showFavsList]);
  const dispatch = useDispatch();

  const SetShowFav = (action) => {
    dispatch(favActions.setShowFavs(action));
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
                  }}
                ></input>
              </div>
            </li>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => SetShowFav(true)}
            >
              <h2>{quantity} movies</h2>
            </button>
          </ul>
        </nav>
      </header>

      {showFavsList && <FavoriteList />}
    </div>
  );
};
export default Header;
