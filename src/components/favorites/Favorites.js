import { useState, useEffect } from "react";
import { getUserInfo } from "../../firebase-config";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";

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
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <h1>Favorites</h1>
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
        }}
      >
        Favorite Movies
      </Typography>
      <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
        {userInfo.favoriteMovies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              width: "100%",
              m: 2,
              p: 1,
              borderRadius: "20px",
              backgroundColor: "white",
              "&:hover": {
                cursor: "pointer",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{
                borderRadius: "20px",
                width: "200px",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
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
        }}
      >
        Favorite TV Shows
      </Typography>
      <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
        {userInfo.favoriteTvShows.map((show) => (
          <Box
            key={show.id}
            sx={{
              width: "100%",
              m: 2,
              p: 1,
              borderRadius: "20px",
              backgroundColor: "white",
              "&:hover": {
                cursor: "pointer",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
            onClick={() => {
              navigate(`/show/${show.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.title}
              style={{
                borderRadius: "20px",
                width: "200px",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Favorites;
