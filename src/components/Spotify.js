import React, { useEffect, useContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Login from './Login';
import TodoList from './TodoList';
import PlaylistMaker from './PlaylistMaker';
import PlaylistSelecter from './PlaylistSelecter';
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
  const pbspotifyContext = useContext(PBSpotifyContext);

  useEffect(() => {
    const hashParams = getHashParams();
    if (Object.keys(hashParams).length !== 0) {
      spotify_api.setAccessToken(hashParams.access_token);
      pbspotifyContext.setSpotify_API(spotify_api);
      window.location.hash = '';
    }
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (event) => {
    // pbspotifyContext.setSelectedPlaylist({});
    pbspotifyContext.setCreateNewPlaylist(JSON.parse(event.target.value));
  };

  const renderPlaylistSelect = () => {
    if (pbspotifyContext.Spotify_ID) {
      return (
        <Form>
          <Form.Check
            type='radio'
            name='playlistSelectRadio'
            label='Create a new Spotify playlist'
            value={true}
            onChange={onChangeHandler}
            checked={pbspotifyContext.CreateNewPlaylist}
          />
          <Form.Check
            type='radio'
            name='playlistSelectRadio'
            label='Add to one of your playlists'
            value={false}
            onChange={onChangeHandler}
            checked={!pbspotifyContext.CreateNewPlaylist}
          />
        </Form>
      );
    }
  };

  const renderPlaylistComponent = () => {
    if (pbspotifyContext.Spotify_ID) {
      if (pbspotifyContext.CreateNewPlaylist) {
        return <PlaylistMaker />;
      } else {
        return <PlaylistSelecter />;
      }
    }
  };

  const renderLoginButtons = () => {
    if (pbspotifyContext.Spotify_ID) {
      return (
        <Row>
          <Col>
            <div id='loggedInDisplay'>
              Logged in as <b>{pbspotifyContext.Spotify_ID.display_name}</b>
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
    pbspotifyContext.setSpotify_API(null);
    pbspotifyContext.setSelectedPlaylist({});
    pbspotifyContext.setSongList([]);
    pbspotifyContext.setPlaylistTracks([]);
    pbspotifyContext.setCompletedSearch(false);
    pbspotifyContext.setLoading(false);
    pbspotifyContext.setResultCount(0);
    pbspotifyContext.setCreateNewPlaylist(true);
    window.location.replace(homeURL());
  };

  return (
    <Container>
      {renderLoginButtons()}
      <Row>
        <TodoList />
      </Row>
      <Row>{renderPlaylistSelect()}</Row>
      <Row>
        <Col>{renderPlaylistComponent()}</Col>
      </Row>
    </Container>
  );
}

export default Spotify;
