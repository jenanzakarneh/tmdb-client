import React from "react";
import { useState } from "react";
import {
  addToWishlist,
  addToWatchedlist,
} from "../../redux/reducers/movieReducers";
import { useDispatch, useSelector } from "react-redux";
const DropDownList = ({ movie }) => {
  const dispach = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  var token = localStorage.getItem("token");
  var myHeaders = new Headers();
  myHeaders.append("authorization", `Bearer ${token}`); //in the header for authorization
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ movie: movie }),
    redirect: "follow",
  };
  const markAsWatched = () => {
    fetch("http://localhost:3001/api/markAsWatched", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    //store in the local storage
    // const watched = localStorage.getItem("watched");
    // if (watched == null) {
    //   localStorage.setItem("watched", JSON.stringify([movie]));
    // } else {
    //   const existedWatchlist = localStorage.getItem("watched");
    //   const currentMovies = JSON.parse(existedWatchlist);
    //   currentMovies.push(movie);
    //   localStorage.setItem("watched", JSON.stringify(currentMovies));
  };

  const addToWishlist = () => {
    fetch("http://localhost:3001/api/addToWishist", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    //store in the local storage
    // const wishlist = localStorage.getItem("wishlist");
    // if (wishlist == null) {
    //   localStorage.setItem("wishlist", JSON.stringify([movie]));
    // } else {
    //   const existedWishlist = localStorage.getItem("wishlist");
    //   const currentMovies = JSON.parse(existedWishlist);
    //   currentMovies.push(movie);
    //   localStorage.setItem("wishlist", JSON.stringify(currentMovies));
    // }
  };
  // const addToWishlistV2 = () => {
  //   //stroe in the store
  //   dispach(addToWishlist(movie));
  //   console.log("added to store wishlist ", wishlist);
  // };
  // const addToWatchedlistV2 = () => {
  //   //store in the store
  //   dispach(addToWatchedlist(movie));
  // };
  return (
    <div onClick={handleOpen} className={"dropdownlist"}>
      ...
      {open && (
        <>
          <div onClick={markAsWatched}>Watched</div>
          <div onClick={addToWishlist}> Like </div>
        </>
      )}
    </div>
  );
};

export default DropDownList;
