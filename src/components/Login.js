import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { homeURL, scopes } from './config';

const Login = () => {
  const CLIENT_ID = '33a2bac1ec3649429a5db59eac210602';
  const authEndpoint = 'https://accounts.spotify.com/authorize';

  const loginUrl = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${homeURL()}&scope=${scopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;

  const spotifyLogin = async () => {
    window.location.assign(loginUrl);
  };

  return (
    <div>
      <Row>
        <Button className='login' size='lg' onClick={() => spotifyLogin()}>
          Login With Spotify
        </Button>
      </Row>
    </div>
  );
};

export default Login;
