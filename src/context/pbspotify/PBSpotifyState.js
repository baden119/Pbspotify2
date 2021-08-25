import React, { useReducer } from 'react';

import PBSpotifyContext from './pbspotifyContext';
import PBSpotifyReducer from './pbspotifyReducer';
import {
    SET_SELECTED_PLAYLIST,
    SET_SPOTIFY_API,
    SET_SPOTIFY_ID,
    SET_SONGLIST,
    SET_COMPLETED_SEARCH,
    SET_PLAYLIST_TRACKS,
    SET_LOADING
} from '../types';

const PBSpotifyState = props => {
   
    const initialState = {
        Spotify_API: null,
        Spotify_ID: null,
        SongList: [],
        SelectedPlaylist: {},
        PlaylistTracks: [],
        CompletedSearch: false,
        Loading: false
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

    // Set users Spotify playlist for saving songs.
    const setSelectedPlaylist = (playlist) => {
        dispatch({
            type: SET_SELECTED_PLAYLIST,
            payload: playlist
        });
    };

    // Main Songlist, originates from PBS API, and is modified with Spotify searches.
    const setSongList = (songlist) =>{
        dispatch({
          type: SET_SONGLIST,
          payload: songlist
        });
      };

    // Control display behaviour related to Spotify searches
    const setCompletedSearch = (status) => {
        dispatch({
            type: SET_COMPLETED_SEARCH,
            payload: status
          });
    }

    const setPlaylistTracks = (trackList) => {
        dispatch({
            type: SET_PLAYLIST_TRACKS,
            payload: trackList
          });
    }

    const setLoading = (status) => {
        dispatch({
            type: SET_LOADING,
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
              PlaylistTracks: state.PlaylistTracks,
              Loading: state.Loading,
              setSpotify_API,
              setSelectedPlaylist,
              setSongList,
              setPlaylistTracks,
              setCompletedSearch,
              setLoading
          }}>
          {props.children}
      </PBSpotifyContext.Provider>
  };
  
  export default PBSpotifyState;