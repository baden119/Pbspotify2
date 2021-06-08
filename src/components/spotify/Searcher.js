import React, {useContext} from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SpotifyContext from "../../context/spotify/spotifyContext";
import SelectedPlaylist from './SelectedPlaylist';

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

  const saveSongs = () => {
    let URI_array = []

    spotifyContext.SpotifySearchResults.forEach((result) => {
      if(result.data.length){
        URI_array = [...URI_array, result.data[0].uri]
      }
    });

    spotifyContext.Spotify_API.addTracksToPlaylist(spotifyContext.SelectedPlaylist.id, URI_array).then(
      function (data) {
        console.log(data)
        //Alert Playlist Save Success.
        //Need to update Selected Playlist, somehow.
      },
      function (err) {
        console.error(err);
      },
    )
  };


  const renderSearchButton = () => {
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
  };
 
  const renderSaveSongsButton = () => {
    if(spotifyContext.Spotify_API != null && Object.keys(spotifyContext.SelectedPlaylist).length !== 0 && spotifyContext.SpotifySearchResults.length){
      return(
        <button onClick={ () => saveSongs()}>Save Songs to Playlist</button>
      )
    }
    else
      return(
        <span>Criteria not met yet</span>
      )

  };

  return (
    <div style ={searcherStyle}>
      <div>
        {renderSearchButton()}
      </div>
      <div>
        {renderSaveSongsButton()}
      </div>

    </div>
  )
};
const searcherStyle = {
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateColumns:'repeat(2, 70% 30%)'
};

export default Searcher