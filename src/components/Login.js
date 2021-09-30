import React, {Fragment} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Login = () => {
  
  const spotifyLogin= async () => {
    try{
      console.log("Sending get auth request")
      const res = await axios.get('https://bitonio.herokuapp.com/get-auth-url');
      console.log("about to change window locatoin")
      window.location.assign(res.data.url);
    }catch(e) {
      console.error(e);
    } 
    };

  return (
      <Fragment>
        <Button className="login" size="lg" onClick={ () => spotifyLogin()}>Login with Spotify</Button>
      </Fragment>
  )
}

export default Login