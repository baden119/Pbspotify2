import React, { useReducer } from 'react';

import PBSpotifyContext from './pbspotifyContext';
import PBSpotifyReducer from './pbspotifyReducer';
import {
    SET_SELECTED_PLAYLIST,
    SET_SPOTIFY_API,
    SET_SPOTIFY_ID,
    SET_SONGLIST,
    SET_COMPLETED_SEARCH
} from '../types';

const PBSpotifyState = props => {
   
    const initialState = {
        Spotify_API: null,
        Spotify_ID: null,
        SongList: [],
        SelectedPlaylist: {},
        CompletedSearch: false
    };
    
    const [state, dispatch] = useReducer(PBSpotifyReducer, initialState);
    
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

    // Set Selected Spotify Playlist
    const setSelectedPlaylist = (playlist) => {
        dispatch({
            type: SET_SELECTED_PLAYLIST,
            payload: playlist
        });
    };

    const setSongList = (songlist) =>{
        dispatch({
          type: SET_SONGLIST,
          payload: songlist
        });
      };

    const setCompletedSearch = (status) => {
        dispatch({
            type: SET_COMPLETED_SEARCH,
            payload: status
          });

    }

      return <PBSpotifyContext.Provider
          value={{
              Spotify_API: state.Spotify_API,
              Spotify_ID: state.Spotify_ID,
              SelectedPlaylist: state.SelectedPlaylist,
              SpotifySearchResults: state.SpotifySearchResults,
              SongList: state.SongList,
              CompletedSearch: state.CompletedSearch,
              setSpotify_API,
              setSelectedPlaylist,
              setSongList,
              setCompletedSearch
          }}>
          {props.children}
      </PBSpotifyContext.Provider>
  };
  
  export default PBSpotifyState;