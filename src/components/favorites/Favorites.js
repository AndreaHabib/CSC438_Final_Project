import { useState, useEffect } from "react";
import { getUserInfo } from "../../firebase-config";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import List from "../List";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Styles";

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
    <ThemeProvider theme={theme}>
      <NavBar />
      <Typography
        textAlign="center"
        variant="h6"
        component="div"
        sx={{
          width: "30%",
          borderRadius: "20px",
          p: 1,
          margin: "0 auto",
          backgroundColor: "primary.light",
          color: "white",
          mb: 5,
        }}
      >
        Favorites
      </Typography>
      {userInfo.favoriteMovies.length > 0 ? (
        <List
          list={userInfo.favoriteMovies}
          title="Favorite Movies"
          type="movie"
        />
      ) : (
        <Box p={4}>
          <Typography
            textAlign="center"
            variant="h6"
            component="div"
            sx={{
              width: "30%",
              borderRadius: "20px",
              p: 1,
              margin: "0 auto",
              backgroundColor: "primary.light",
              color: "white",
              mb: 5,
            }}
          >
            No Favorite Movies
          </Typography>
        </Box>
      )}
      {userInfo.favoriteTvShows.length > 0 ? (
        <List
          list={userInfo.favoriteTvShows}
          title="Favorite Tv Shows"
          type="show"
        />
      ) : (
        <Box p={4}>
          <Typography
            textAlign="center"
            variant="h6"
            component="div"
            sx={{
              width: "30%",
              borderRadius: "20px",
              p: 1,
              margin: "0 auto",
              backgroundColor: "primary.light",
              color: "white",
              mb: 5,
            }}
          >
            No Favorite Tv Shows
          </Typography>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Favorites;
