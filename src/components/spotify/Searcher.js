import React, {useContext} from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SpotifyContext from "../../context/spotify/spotifyContext";

const Searcher = () => {

  const pbsContext = useContext(PbsContext);
  const spotifyContext = useContext(SpotifyContext);

  //Uses Spotify API to search through PBS Songlist. 
  //Saves results to Spotify Context (SpotifySearchResults)
  //Can change search results limit here
  const SpotifySearch= async () => {
    let results = []
    pbsContext.SongList.forEach((song) => {
      spotifyContext.Spotify_API.searchTracks((song.track +" "+ song.artist), { limit: 3 }).then(
        function (data) {
          results = [...results, {id: song.id, data: data.tracks.items}];
          results.sort(function (a, b){return a.id - b.id});
          spotifyContext.setSpotifySearchResults(results);
          //Setting a timeout to prevent API rate limit errors
        },
        function (err) {
          console.error(err);
        },
      )})
  };


  if (spotifyContext.Spotify_API != null){
    return (
      <div>
        <button onClick={ () => SpotifySearch()}>Search</button> 
        <h5>Songs in State: {pbsContext.SongList.length}</h5>
      </div>
    )
  }
  else
    return (
      <h3>Login with Spotify to Search</h3>
    )
}

export default Searcher