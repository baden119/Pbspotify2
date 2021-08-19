import React, { useEffect, useContext, useState, Fragment } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './Login';
import PlaylistMaker from './PlaylistMaker';
import PlaylistSelecter from './PlaylistSelecter';
import { getTokenFromUrl } from "./config";
import SpotifyWebApi from "spotify-web-api-js";
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";

const spotify_api = new SpotifyWebApi();

function Spotify() {

  const pbspotifyContext = useContext(PBSpotifyContext);
  const [PlaylistOption, setPlaylistOption] = useState('CreateNew');

  // Taken from:
  // https://github.com/atharvadeosthale/spotify-clone/blob/master/src/App.js
    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = "";
      const _token = hash.access_token;
  
      if (_token) {
        spotify_api.setAccessToken(_token);
        pbspotifyContext.setSpotify_API(spotify_api);
      }
    // eslint-disable-next-line
    }, []);


    const onChangeHandler = event => {
      pbspotifyContext.setSelectedPlaylist({});
      setPlaylistOption(event.target.value);
    };

    const renderPlaylistSelect = () => {
      if(pbspotifyContext.Spotify_ID){
        return(
          <select onChange={onChangeHandler}>
            <option value={'CreateNew'}>Create a New Spotify PlayList</option>
            <option value={'SelectExisting'}>Select PlayList from your Library</option>
          </select>
        )
      }
    };

    const renderPlaylistComponent = () => {
      if (pbspotifyContext.Spotify_ID){
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
    <Row>
      <Col>
        {pbspotifyContext.Spotify_ID ? <Fragment>Logged in as <b>{pbspotifyContext.Spotify_ID.display_name}</b></Fragment> : <Login />}
      </Col>
      <Col>
        {renderPlaylistSelect()}
        {renderPlaylistComponent()}
      </Col>
    </Row>
  )
}

export default Spotify
