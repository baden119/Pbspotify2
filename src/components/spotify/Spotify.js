import React, { useEffect, useContext, useState, Fragment } from "react";
import Login from './Login';
// import PlaylistMaker from './PlaylistMaker';
import { getTokenFromUrl } from "./config";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyContext from "../../context/spotify/spotifyContext";

const spotify_api = new SpotifyWebApi();

function Spotify() {

  const spotifyContext = useContext(SpotifyContext);
  const [PlaylistOption, setPlaylistOption] = useState('CreateNew');

  // Taken from:
  // https://github.com/atharvadeosthale/spotify-clone/blob/master/src/App.js
    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = "";
      const _token = hash.access_token;
  
      if (_token) {
        // setToken(_token);
        spotify_api.setAccessToken(_token);
        spotifyContext.setSpotify_API(spotify_api);
      }
    // eslint-disable-next-line
    }, []);

    const onChangeHandler = event => {
      console.log("onchange")
      setPlaylistOption(event.target.value);
    };
  
  return (
    <div style={spotifyStyle}>
      <div>
        {spotifyContext.Spotify_ID ? <Fragment>Logged in as <b>{spotifyContext.Spotify_ID.display_name}</b></Fragment> : <Login />}
      </div>

      <div>
      {spotifyContext.Spotify_ID && 
      <select>
          <option value={'CreateNew'} onChange={onChangeHandler}>Create a New Playlist</option>
          <option value={'SelectExisting'} onChange={onChangeHandler}>Select a Playlist</option>
      </select>}
      </div> 
    </div>
  )
}

const spotifyStyle = {
  display: 'grid',
  gridTemplateColumns:'15% 85%',
  backgroundColor:'pink',
  minHeight:'100px',
  height:'auto',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
};
export default Spotify
