import React, { useReducer } from 'react';

import SpotifyContext from './spotifyContext';
import SpotifyReducer from './spotifyReducer';
import {
    SET_SPOTIFY_API
} from '../types';

const SpotifyState = props => {
   
    const initialState = {
        Spotify_API: null
    };
    
    const [state, dispatch] = useReducer(SpotifyReducer, initialState);
    
    // Set Spotify Api
    const setSpotify_API = (Spotify_API) => {
        dispatch({
            type: SET_SPOTIFY_API,
            payload: Spotify_API
        });
    };
        
      return <SpotifyContext.Provider
          value={{
              Spotify_API: state.Spotify_API,
              setSpotify_API
          }}>
          {props.children}
      </SpotifyContext.Provider>
  };
  
  export default SpotifyState;