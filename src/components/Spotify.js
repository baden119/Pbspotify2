import React, { useEffect, useContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { homeURL, scopes } from './config';

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
  const { setSpotify_API, Spotify_ID } = useContext(PBSpotifyContext);
  const CLIENT_ID = '33a2bac1ec3649429a5db59eac210602';
  const authEndpoint = 'https://accounts.spotify.com/authorize';

  useEffect(() => {
    const hashParams = getHashParams();
    if (Object.keys(hashParams).length !== 0) {
      spotify_api.setAccessToken(hashParams.access_token);
      setSpotify_API(spotify_api);
      window.location.hash = '';
    }
    // eslint-disable-next-line
  }, []);

  const loginUrl = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${homeURL()}&scope=${scopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;

  const spotifyLogin = async () => {
    window.location.assign(loginUrl);
  };

  const renderLoginButtons = () => {
    if (!Spotify_ID) {
      return (
        <Container className='Centered m-3'>
          <Button className='login' size='lg' onClick={() => spotifyLogin()}>
            Login With Spotify
          </Button>
        </Container>
      );
    }
  };

  return <Container>{renderLoginButtons()}</Container>;
}

export default Spotify;
