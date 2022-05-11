import { async } from "@firebase/util";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import NavBar from "../navbar/NavBar";
import { FormGroup, FormControl, TextField, Button } from "@mui/material";

export default function Trailer() {
  let array = [];
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  const [key, setkey] = useState("");

  const getTrailer = async (e) => {
    e.preventDefault();
    const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=bacc58af01e82926a93e6c84b55f9c5f&query=${search}&page=1`;
    const response = await fetch(apiURL);
    const json = await response.json();
    setTitle(json.results[0].original_title);
    for (let i = 0; i < json.results.length; i++) {
      array[i] = json.results[i].id;
    }
    let movieId = array[0];
    const apiURL2 = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=bacc58af01e82926a93e6c84b55f9c5f&language=en-US`;
    const response2 = await fetch(apiURL2);
    const json2 = await response2.json();
    setkey(json2.results[0].key.toString());
  };

  return (
    <Fragment>
      <NavBar />

      <div>
        <FormGroup className="form">
          <FormControl variant="standard" sx={{ width: "100%", m: 0.5 }}>
            <TextField
              variant="filled"
              type="text"
              required
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              label="Search for a movie"
              aria-describedby="enter email"
            />
          </FormControl>
          <FormControl variant="standard" sx={{ width: "100%", m: 0.5 }}>
            <Button variant="contained" onClick={getTrailer}>
              Search
            </Button>
          </FormControl>
        </FormGroup>

        {key && (
          <iframe
            width="100%"
            height="100%"
            title="trailer"
            src={`https://www.youtube.com/embed/${key}`}
          ></iframe>
        )}
      </div>
    </Fragment>
  );
}
