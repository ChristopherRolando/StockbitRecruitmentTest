import React, { useReducer, useEffect } from "react";
import Movie from "./Movie";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=faf7e5bb";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(response => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: response.data.Search
      });
      console.log(response)
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=faf7e5bb`).then(
      response => {
        if (response.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: response.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: response.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Search search={search} />
        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
