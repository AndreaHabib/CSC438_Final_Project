import { async } from "@firebase/util";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import NavBar from "../navbar/NavBar";

export default function Trailer() {
  let array = [];
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  const [key, setkey] = useState("");

  const getTrailer = async (e) => {
    e.preventDefault();
    let apiURL = `https://api.themoviedb.org/3/search/movie?api_key=bacc58af01e82926a93e6c84b55f9c5f&query=${search}&page=1`;

    const response = await fetch(apiURL);
    const json = await response.json();

    setTitle(json.results[0].original_title);

    console.log(title);

    for (let i = 0; i < json.results.length; i++) {
      array[i] = json.results[i].id;
    }

    let movieId = array[0];

    let apiURL2 = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=bacc58af01e82926a93e6c84b55f9c5f&language=en-US`;

    const response2 = await fetch(apiURL2);
    const json2 = await response2.json();
    console.log(json2);

    setkey(json2.results[0].key.toString());

    console.log(key);

    document.querySelector(".video").style.display = "block";
    document.querySelector(".cont-trailer").style.display = "block";
  };

  return (
    <Fragment>
      <NavBar />

      <div>
        <form onSubmit={getTrailer}>
          <input
            placeholder="Specific Movie Name"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit"> Search </button>
        </form>

        <div className="video">
          <iframe
            width="100%"
            src={`https://www.youtube.com/embed/` + key}
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
}
