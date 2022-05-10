import { useState, React, Fragment, useEffect, useCallback } from "react";
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
import List from "../List";

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [playingNow, setPlayingNow] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tvShow, setTvShow] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = useCallback(
    (e) => {
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
      api
        .getTrendingTvShows()
        .then((data) => setTvShow(data))
        .catch((error) =>
          setErrors({
            ...errors,
            tvShow: error,
          })
        );
      setLoading(false);
    },
    [errors]
  );

  useEffect(() => {
    getData();
  }, [getData]);

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
            <List list={trending} title="Trending Movies" type="movie" />
            <List list={tvShow} title="Trending Tv Shows" type="show" />
            <List list={popular} title="Popular Movies" type="movie" />
            <List list={playingNow} title="Playing Now" type="movie" />
            <List list={upcoming} title="Upcoming" type="movie" />
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
