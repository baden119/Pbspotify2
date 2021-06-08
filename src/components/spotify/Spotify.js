import React, { useEffect, useContext, useState, Fragment } from "react";
import Login from './Login';
import PlaylistMaker from './PlaylistMaker';
import PlaylistSelecter from './PlaylistSelecter';
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
      setPlaylistOption(event.target.value);
    };

    const renderPlaylistSelect = () => {
      if(spotifyContext.Spotify_ID){
        return(
          <select onChange={onChangeHandler}>
            <option value={'CreateNew'}>Create a New Spotify PlayList</option>
            <option value={'SelectExisting'}>Select PlayList from your Library</option>
          </select>
        )
      }
    };

    const renderPlaylistComponent = () => {
      if (spotifyContext.Spotify_ID){
        if (PlaylistOption === 'CreateNew'){
          return(
            <PlaylistMaker />
          )}
        else{
          return(
            <PlaylistSelecter />
          )}
      }
    }
  
  return (
    <div style={spotifyStyle}>
      <div>
        {spotifyContext.Spotify_ID ? <Fragment>Logged in as <b>{spotifyContext.Spotify_ID.display_name}</b></Fragment> : <Login />}
      </div>
      <div>
        {renderPlaylistSelect()}
        {renderPlaylistComponent()}
      </div>
    </div>
  )
}

const spotifyStyle = {
  display: 'grid',
  gridTemplateColumns:'repeat(2, 1fr)',
  backgroundColor:'pink',
  minHeight:'100px',
  // height:'auto',
  justifyContent: 'center',
  // alignItems: 'center',
  // textAlign: 'center',
};
export default Spotify
