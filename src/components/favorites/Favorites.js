import { useState, useEffect } from "react";
import { getUserInfo } from "../../firebase-config";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import List from "../List";
const Favorites = () => {
  const [userInfo, setUserInfo] = useState({
    favoriteMovies: [],
    favoriteTvShows: [],
  });

  useEffect(() => {
    getUserInfo().then(async (info) => {
      const { favoriteMovies, favoriteTvShows } = info;
      favoriteMovies.map(async (movie) => {
        await fetch(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((data) => {
            setUserInfo((prevState) => ({
              ...prevState,
              favoriteMovies: [...prevState.favoriteMovies, data],
            }));
          });
      });
      favoriteTvShows.map(async (show) => {
        await fetch(
          `https://api.themoviedb.org/3/tv/${show}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((data) => {
            setUserInfo((prevState) => ({
              ...prevState,
              favoriteTvShows: [...prevState.favoriteTvShows, data],
            }));
          });
      });
    });
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Favorites</h1>
      <List
        list={userInfo.favoriteMovies}
        title="Favorite Movies"
        type="movie"
      />
      <List
        list={userInfo.favoriteTvShows}
        title="Favorite Tv Shows"
        type="show"
      />
    </div>
  );
};

export default Favorites;
