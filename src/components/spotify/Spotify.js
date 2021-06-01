import React, { useEffect, useState, useContext } from "react";
import '../../App.css';
import Login from './Login';
// import Searcher from './Searcher';
import PlaylistMaker from './PlaylistMaker';
import { getTokenFromUrl } from "./config";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyContext from "../../context/spotify/spotifyContext";

const spotify_api = new SpotifyWebApi();

function Spotify() {

  const spotifyContext = useContext(SpotifyContext);
  const [token, setToken] = useState();

  // Taken from:
  // https://github.com/atharvadeosthale/spotify-clone/blob/master/src/App.js
    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = "";
      const _token = hash.access_token;
  
      if (_token) {
        setToken(_token);
        spotify_api.setAccessToken(_token);
        spotifyContext.setSpotify_API(spotify_api)
      }
    }, []);

  return (
    <div style={spotifyStyle}>
      <div>
        {token ? <h5>Logged in</h5> : <Login />}
      </div>

      {/* <div>
      {token ? <PlaylistMaker /> : <div></div> }
      </div>  */}
    </div>
  
        // {/* <h1>{String(spotifyContext.IsLoggedIn)}</h1> */}
        //   <Searcher spotify={spotify_api} />
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
