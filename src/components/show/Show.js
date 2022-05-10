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
import { addFavoriteTvShow } from "../../firebase-config";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Styles";

export default function Show() {
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchShow = useCallback(async () => {
    setLoading(true);
    await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [id]);
  useEffect(() => {
    fetchShow();
  }, [fetchShow]);

  return (
    <ThemeProvider theme={theme}>
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
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
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
                {show.title}
              </Typography>
              <Typography textAlign="center" variant="h6">
                {show.tagline}
              </Typography>
              <Typography mt={1} mb={1} textAlign="center" variant="h6">
                {show.overview}
              </Typography>
              <Typography mt={1} mb={2} textAlign="center" variant="h6">
                Release Date: {show.release_date}
              </Typography>
              <Button
                onClick={() => addFavoriteTvShow(show.id)}
                variant="contained"
              >
                {" "}
                Add to Favorites
              </Button>
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
                    Episode Runtime: {show.episode_run_time[0]} mins
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
                    #Episodes {show.number_of_episodes}
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
                    #Seasons {show.number_of_seasons}
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
                    Ratings: {show.vote_average}/10
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
                  <Typography textAlign="center" variant="h6">
                    Genres: {show.genres.map((genre) => genre.name + " ")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
