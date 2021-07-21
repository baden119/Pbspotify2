import React, {useContext} from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SpotifyContext from "../../context/spotify/spotifyContext";
import { useAlert } from 'react-alert'

const Searcher = () => {

  const pbsContext = useContext(PbsContext);
  const spotifyContext = useContext(SpotifyContext);

  const alert = useAlert()

  const cleanString = (string) =>{

        if (string === null){
          return "";
        }
        string=string.split('-')[0]
        string=string.split('(')[0]
        string=string.split('+')[0]
        string=string.split('[')[0]
        string=string.split('&')[0]
        string=string.split('ft.')[0]
        string=string.split('feat.')[0]
        string=string.split('feat')[0]
        string=string.split('FT')[0]
        string=string.split('Ft.')[0]
        
        // Just remove dont cut rest of string.
        // string=string.split('|')[0]
        return string;
};

  //Uses Spotify API to search through PBS Songlist. 
  //Saves results to Spotify Context (SpotifySearchResults)
  //Can change search results limit here
  
  const SpotifySearch = async () => {

    const resultsList = await Promise.all(pbsContext.SongList.map(async (song) => {
      try{
        // Basic Search
        const res = await spotifyContext.Spotify_API.searchTracks((song.track +" "+ song.artist), { limit: 1 });
        if (res.tracks.items[0]) {
          // Add response to results if successful
          return {...song, spotifyResponse: res.tracks.items[0], advanced: false};
        }else{
            // Advanced Search if basic fails (try to clean up data inputs a bit)
            const res = await spotifyContext.Spotify_API.searchTracks((cleanString(song.track) +" "+ cleanString(song.artist)), { limit: 1 });
            if (res.tracks.items[0]) {
              // Add response to results if successful
              return {...song, spotifyResponse: res.tracks.items[0], advanced: true};
            }else{
              // Set response data to false if still no results 
              console.log("No Data Found", song.artist, song.track )
              return {...song, spotifyResponse: false}
            }
        }
      // Catch syntax taken from https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      }catch(err){
        // TODO Sort out 429 errors
        if (err.response.headers["retry-after"]) {
          const retry = err.response.headers["retry-after"]
          console.log("retry data", retry)
        } else {
          console.error("Spotify Search", err);
        }

      } 
    }))
    spotifyContext.setSpotifySearchResults(resultsList);
  };

  const saveSongs = () => {
    let URI_array = []

    //TODO Functionality for > 100 song playlists.
    spotifyContext.SpotifySearchResults.forEach((song) => {
      if(song.spotifyResponse){
        URI_array = [...URI_array, song.spotifyResponse.uri]
      }
    });

    spotifyContext.Spotify_API.addTracksToPlaylist(spotifyContext.SelectedPlaylist.id, URI_array).then(
      function (data) {
        console.log("SaveSongs Result", data)
        alert.success("Success! Songs saved to Spotify Playlist")
        spotifyContext.setSpotifySearchResults([]);
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