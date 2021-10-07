import React from 'react'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { apiURL } from "./config";

const Login = () => {
  
  const spotifyLogin= async () => {
    try{
      const res = await axios.get( apiURL() + '/get-auth-url');
      window.location.assign(res.data.url);
    }catch(e) {
      console.error(e);
    } 
    };

  return (
      <Row>
        <Button className="login" size="lg" onClick={ () => spotifyLogin()}>Login with Spotify</Button>
      </Row>
  )
}

export default Login