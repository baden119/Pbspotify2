import React, { useReducer } from 'react';

import SpotifyContext from './spotifyContext';
import SpotifyReducer from './spotifyReducer';
import {
    SET_SPOTIFY_API,
    SET_SPOTIFY_ID,
    SET_SPOTIFY_SEARCH_RESULTS
} from '../types';

const SpotifyState = props => {
   
    const initialState = {
        Spotify_API: null,
        Spotify_ID: null,
        SpotifySearchResults: []
    };
    
    const [state, dispatch] = useReducer(SpotifyReducer, initialState);
    
    // Set Spotify Api & User Info
    const setSpotify_API = (Spotify_API) => {
        dispatch({
            type: SET_SPOTIFY_API,
            payload: Spotify_API
        });
        Spotify_API.getMe().then(
            function (data) {
                dispatch({
                    type: SET_SPOTIFY_ID,
                    payload: data
                });
            },
            function (err) {
              console.error(err);
            }
          );
    };

    // Save Spotify Search Results
    const setSpotifySearchResults = (results) => {
        dispatch({
            type: SET_SPOTIFY_SEARCH_RESULTS,
            payload: results
        });
    };

      return <SpotifyContext.Provider
          value={{
              Spotify_API: state.Spotify_API,
              Spotify_ID: state.Spotify_ID,
              SpotifySearchResults: state.SpotifySearchResults,
              setSpotify_API,
              setSpotifySearchResults
          }}>
          {props.children}
      </SpotifyContext.Provider>
  };
  
  export default SpotifyState;