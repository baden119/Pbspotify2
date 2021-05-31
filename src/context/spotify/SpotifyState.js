import React, { useReducer } from 'react';

import SpotifyContext from './spotifyContext';
import SpotifyReducer from './spotifyReducer';
import {
    SET_LOGGED_IN
} from '../types';

const SpotifyState = props => {
   
    const initialState = {
        IsLoggedIn: false
    };
  
    // Set Logged In
    const setLoggedIn = () => dispatch({ type: SET_LOGGED_IN }); 

    const [state, dispatch] = useReducer(SpotifyReducer, initialState);
  
      return <SpotifyContext.Provider
          value={{
              IsLoggedIn: state.IsLoggedIn
          }}>
          {props.children}
      </SpotifyContext.Provider>
  };
  
  export default SpotifyState;