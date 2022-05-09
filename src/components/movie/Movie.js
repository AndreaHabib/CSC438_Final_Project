import React, { Fragment, useCallback } from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Avatar, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@mui/material";

export default function Movie() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchMovie = useCallback(async () => {
    setLoading(true);
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [id]);
  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

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
        <Box p={4}>
          <Grid
            container
            sx={{
              backgroundColor: "primary.light",
              pt: 3,
              pb: 3,
              borderRadius: "10px",
              color: "white",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
            >
              <Avatar
                sx={{
                  width: "16rem",
                  height: "16rem",
                  border: "2px solid white",
                }}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
            >
              <Typography textAlign="center" variant="h4">
                {movie.title}
              </Typography>
              <Typography textAlign="center" variant="h6">
                {movie.tagline}
              </Typography>
              <Typography mt={1} mb={1} textAlign="center" variant="h6">
                {movie.overview}
              </Typography>
              <Typography mt={1} mb={2} textAlign="center" variant="h6">
                Release Date: {movie.release_date}
              </Typography>
              <Button variant="contained">Add to Favorites</Button>
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1, mt: 1 }}>
            <Typography
              textAlign="center"
              variant="h6"
              component="div"
              sx={{
                width: "50%",
                borderRadius: "20px",
                p: 1,
                margin: "0 auto",
                backgroundColor: "primary.light",
                color: "white",
              }}
            >
              More Infomation
            </Typography>
            <Box mt={-1}>
              <Grid
                container
                sx={{
                  backgroundColor: "primary.light",
                  pt: 3,
                  pb: 3,
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <Grid
                  sx={{ display: "flex", justifyContent: "center", p: 0 }}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <Typography variant="h6">
                    Runtime: {movie.runtime} mins
                  </Typography>
                </Grid>
                <Grid
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <Typography variant="h6">Budget: ${movie.budget}</Typography>
                </Grid>
                <Grid
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <Typography variant="h6">
                    Revenue: ${movie.revenue}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <Typography variant="h6">
                    Ratings: {movie.vote_average}/10
                  </Typography>
                </Grid>
                <Grid
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <Typography variant="h6">
                    Genres: {movie.genres.map((genre) => genre.name + " ")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  );
}
