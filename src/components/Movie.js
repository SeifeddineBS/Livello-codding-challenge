import React from "react";

const Movie = (props) => {
  return (
    <>
      <div className="container">
        <h1 className="my-4">{props?.movie.Title}</h1>

        <div className="row">
          <div className="col-md-8">
            <img className="img-fluid" src={props?.movie.Poster} alt=""></img>
          </div>

          <div className="col-md-4">
            <h3 className="my-3">Type</h3>
            <b>{props?.movie.Type}</b>

            <h3 className="my-3">Year</h3>
            <b>{props?.movie.Year}</b>
          </div>
        </div>

        <h3 className="my-4">Recents</h3>

        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <a href="#">
              <img
                className="img-fluid"
                src="https://via.placeholder.com/500x300"
                alt=""
              ></img>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <a href="#">
              <img
                className="img-fluid"
                src="https://via.placeholder.com/500x300"
                alt=""
              ></img>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <a href="#">
              <img
                className="img-fluid"
                src="https://via.placeholder.com/500x300"
                alt=""
              ></img>
            </a>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <a href="#">
              <img
                className="img-fluid"
                src="https://via.placeholder.com/500x300"
                alt=""
              ></img>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Movie;
