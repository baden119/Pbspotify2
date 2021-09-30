import React, { useEffect, useContext} from "react";
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

  const Reset = () => {
    console.log("Reset");
    // localStorage.setItem('localShowStorage', {});
    localStorage.clear();
    pbspotifyContext.setSpotify_API(null);
    pbspotifyContext.setSelectedPlaylist({});
    pbspotifyContext.setSongList([]);
    pbspotifyContext.setPlaylistTracks([]);
    pbspotifyContext.setCompletedSearch(false);
    pbspotifyContext.setLoading(false);
    pbspotifyContext.setResultCount(0);
    pbspotifyContext.setCreateNewPlaylist(true);
    window.location.reload();
  }

  const renderLoginButtons = () => {
    if (pbspotifyContext.Spotify_ID){
      return (
        <div>
          <Button variant="primary" size="sm" onClick={ () => Reset()}>Logout / Reset</Button>
          <div id="loggedInDisplay">Logged in as <b>{pbspotifyContext.Spotify_ID.display_name}</b></div>
        </div>  
      )
    }else return (<Login />)

  }

  return (
    <Row>
      <Col>
        {renderLoginButtons()}
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
