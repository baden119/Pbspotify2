import React from 'react'
import { loginUrl } from "./config";

const Login = () => {
  
  return (
      <div>
          <a href={loginUrl}><button>Login with Spotify</button></a>
      </div>
  )
}

export default Login