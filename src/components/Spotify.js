import React, { useEffect, useContext, Fragment } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Login from './Login';
import PlaylistMaker from './PlaylistMaker';
import PlaylistSelecter from './PlaylistSelecter';
import { getTokenFromUrl } from "./config";
import SpotifyWebApi from "spotify-web-api-js";
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";

const spotify_api = new SpotifyWebApi();

function Spotify() {

  const pbspotifyContext = useContext(PBSpotifyContext);

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
      // pbspotifyContext.setSelectedPlaylist({});
      pbspotifyContext.setCreateNewPlaylist(JSON.parse(event.target.value));
    };

    const renderPlaylistSelect = () => {
      if(pbspotifyContext.Spotify_ID){
        return(
          <Form>
            <Form.Check 
              type="radio"
              name="playlistSelectRadio"
              label="Create a new Spotify playlist"
              value={true}
              onChange={onChangeHandler}
              checked={pbspotifyContext.CreateNewPlaylist}
            />
            <Form.Check 
              type="radio"
              name="playlistSelectRadio"
              label="Add to one of your playlists"
              value={false}
              onChange={onChangeHandler}
              checked={!pbspotifyContext.CreateNewPlaylist}
            />
          </Form>
        )
      }
    };

  const renderPlaylistComponent = () => {
    if (pbspotifyContext.Spotify_ID){
      if (pbspotifyContext.CreateNewPlaylist){
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
      </Col>
      <Col>
        {renderPlaylistComponent()}
      </Col>
    </Row>
  )
}

export default Spotify