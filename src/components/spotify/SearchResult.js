import React, { useEffect, useContext, useState } from 'react';
import SpotifyContext from "../../context/spotify/spotifyContext";

function SearchResult(songId) {
  
  const spotifyContext = useContext(SpotifyContext);
  const [match, setMatch] = useState([]);

  useEffect(() => {
  spotifyContext.SpotifySearchResults.forEach((result) => {
    if(result.id === songId.songId){
      setMatch(result);
      return;
    }
  });
  }, [spotifyContext.SpotifySearchResults, songId.songId]);

  if(match.data !== undefined){
    if(match.data.length > 0){
      return (
        <React.Fragment>
          {match.data[0].name} / {match.data[0].artists[0].name}   
        </React.Fragment>
      )}
      else return (
      <React.Fragment>
      No Data Found  
      </React.Fragment>
    )
  }
  else return null;

};

export default SearchResult
