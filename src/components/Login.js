import React, {Fragment} from 'react'
import Button from 'react-bootstrap/Button'
import { loginUrl } from "./config";

const Login = () => {
  
  return (
      <Fragment>
          <a href={loginUrl}><Button variant="info" size="lg">Login with Spotify</Button></a>
      </Fragment>
  )
}

export default Login