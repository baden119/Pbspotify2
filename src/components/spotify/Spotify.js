import React, { useEffect, useState } from "react";
import Login from './Login';
import Searcher from './Searcher';
import { getTokenFromUrl } from "./config";
import SpotifyWebApi from "spotify-web-api-js";


const spotify_api = new SpotifyWebApi();

function Spotify() {

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
        }
      }, []);

    return (
        <div>
            {token ? <h5>Logged in</h5> : <Login />}
            <Searcher spotify={spotify_api}/>
        </div>
    )
}

export default Spotify
