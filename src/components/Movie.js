import React,  { useState } from "react";
import Modal from 'react-modal';
import './movie.css';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

  const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }
    const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
    }
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          onClick={setModalIsOpenToTrue}
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
          <button className="close" onClick={setModalIsOpenToFalse}>x</button>
          <img
          className="poster"
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
        <h2>{movie.Title}</h2>
        <h2>{movie.Year}</h2>
      </Modal>
    </div>
  );
};

export default Movie;
