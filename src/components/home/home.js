import { useState, React, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ApiClient from "../../api/ApiClient";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import NavBar from "../navbar/NavBar";

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [playingNow, setPlayingNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = (e) => {
    setLoading(true);
    const api = new ApiClient();
    api
      .getTrendingMovies()
      .then((data) => setTrending(data))
      .catch((error) =>
        setErrors({
          ...errors,
          trending: error,
        })
      );
    api
      .getPopularMovies()
      .then((data) => setPopular(data))
      .catch((error) =>
        setErrors({
          ...errors,
          popular: error,
        })
      );
    api
      .getPlayingNow()
      .then((data) => setPlayingNow(data))
      .catch((error) =>
        setErrors({
          ...errors,
          playingNow: error,
        })
      );
    api
      .getUpcoming()
      .then((data) => setUpcoming(data))
      .catch((error) =>
        setErrors({
          ...errors,
          upcoming: error,
        })
      );
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
