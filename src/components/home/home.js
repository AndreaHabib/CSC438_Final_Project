import { useState, React, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import NavBar from "../navbar/NavBar";

function Home() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [playingNow, setPlayingNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (e) => {
    setLoading(true);

    const trendingURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
    fetch(trendingURL)
      .then((response) => response.json())
      .then((json) => setTrending(json["results"]))
      .catch((error) => setErrors({ ...errors, trending: error }));

    const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=5932b064e032c45eb55f4b0bc2b65dc8&language=en-US&page=1`;
    fetch(popularURL)
      .then((response) => response.json())
      .then((json) => setPopular(json["results"]))
      .catch((error) => setErrors({ ...errors, popular: error }));

    const playingNowURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=5932b064e032c45eb55f4b0bc2b65dc8&language=en-US&region=US`;
    fetch(playingNowURL)
      .then((response) => response.json())
      .then((json) => setPlayingNow(json["results"]))
      .catch((error) => setErrors({ ...errors, playingNow: error }));

    const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=5932b064e032c45eb55f4b0bc2b65dc8&language=en-US&region=US`;
    fetch(upcomingURL)
      .then((response) => response.json())
      .then((json) => setUpcoming(json["results"]))
      .catch((error) => setErrors({ ...errors, playingNow: error }));

    setLoading(false);
  };

  return (
    <Fragment>
      <NavBar />
      {loading ? (
        <Dialog
          open={loading}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Loading Movies...`}</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DialogContentText id="alert-dialog-description">
              <CircularProgress />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : (
        <Fragment>
          <Box sx={{ flexGrow: 1, mt: 3 }}>
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
              Trending
            </Typography>
            <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
              {trending.map((movie) => (
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
              Upcoming
            </Typography>
            <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
              {upcoming.map((movie) => (
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
              Playing Now
            </Typography>
            <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
              {playingNow.map((movie) => (
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
              Popular
            </Typography>
            <Box sx={{ width: "100%", display: "flex", overflowX: "scroll" }}>
              {popular.map((movie) => (
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
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
