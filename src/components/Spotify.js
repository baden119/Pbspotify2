import React, { useEffect, useContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Login from './Login';
import TodoList from './TodoList';
import PlaylistMaker from './PlaylistMaker';
import { homeURL } from './config';

import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';

const spotify_api = new SpotifyWebApi();

// getHashParams extracts access token from URL string returned by Spotify.
// Taken from:
// https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/public/index.html
function getHashParams() {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

function Spotify() {
  const {
    setLoading,
    setResultCount,
    setSongList,
    setPlaylistTracks,
    setCompletedSearch,
    setSelectedShowName,
    setSpotify_API,
    SelectedShowName,
    Spotify_ID,
    setPlaylistName,
  } = useContext(PBSpotifyContext);

  useEffect(() => {
    const hashParams = getHashParams();
    if (Object.keys(hashParams).length !== 0) {
      spotify_api.setAccessToken(hashParams.access_token);
      setSpotify_API(spotify_api);
      window.location.hash = '';
    }
    // eslint-disable-next-line
  }, []);

  const renderPlaylistName = () => {
    if (Spotify_ID && SelectedShowName.length) {
      return <PlaylistMaker />;
    }
  };

  const renderLoginButtons = () => {
    if (Spotify_ID) {
      return (
        <Row>
          <Col>
            <div id='loggedInDisplay'>
              Logged in as <b>{Spotify_ID.display_name}</b>
            </div>
          </Col>
          <Col>
            <Button variant='primary' size='sm' onClick={() => Reset()}>
              Logout / Reset
            </Button>
          </Col>
        </Row>
      );
    } else return <Login />;
  };
  const Reset = () => {
    console.log('Reset');
    localStorage.clear();
    setSpotify_API(null);
    setSongList([]);
    setCompletedSearch(false);
    setLoading(false);
    setResultCount(0);
    setSelectedShowName('');
    window.location.replace(homeURL());
    setPlaylistName('');
  };

  return (
    <Container>
      <Button variant='primary' size='sm' onClick={() => Reset()}>
        Reset
      </Button>
      {renderLoginButtons()}
      <Row>
        <TodoList />
      </Row>
      <Row>
        <Col>{renderPlaylistName()}</Col>
      </Row>
    </Container>
  );
}

export default Spotify;
