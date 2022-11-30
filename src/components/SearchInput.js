import React from "react";

const SearchInput = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        placeholder="Search"
        value={props.value}
        onChange={(event) => props.setInput(event.target.value)}
      ></input>
    </div>
  );
};
export default SearchInput;