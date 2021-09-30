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
    SET_LOADING,
    SET_RESULT_COUNT,
    SET_CREATE_NEW_PLAYLIST
} from '../types';

const PBSpotifyState = props => {
   
    const initialState = {
        Spotify_API: null,
        Spotify_ID: null,
        SongList: [],
        SelectedPlaylist: {},
        PlaylistTracks: [],
        CompletedSearch: false,
        Loading: false,
        ResultCount : 0,
        CreateNewPlaylist: true 
    };
    
    const [state, dispatch] = useReducer(PBSpotifyReducer, initialState);
    
    // Set Spotify Api & User Info
    const setSpotify_API = (Spotify_API) => {
        dispatch({
            type: SET_SPOTIFY_API,
            payload: Spotify_API
        });
        if (Spotify_API){
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
        }
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

    const setResultCount = (count) => {
        dispatch({
            type: SET_RESULT_COUNT,
            payload: count
          });
    }

    const setCreateNewPlaylist = (bool) => {
        dispatch({
            type: SET_CREATE_NEW_PLAYLIST,
            payload: bool
          });
    }

      return <PBSpotifyContext.Provider
          value={{
              Spotify_API: state.Spotify_API,
              Spotify_ID: state.Spotify_ID,
              SelectedPlaylist: state.SelectedPlaylist,
              SongList: state.SongList,
              CompletedSearch: state.CompletedSearch,
              PlaylistTracks: state.PlaylistTracks,
              Loading: state.Loading,
              ResultCount: state.ResultCount,
              CreateNewPlaylist: state.CreateNewPlaylist,
              setSpotify_API,
              setSelectedPlaylist,
              setSongList,
              setPlaylistTracks,
              setCompletedSearch,
              setLoading,
              setResultCount,
              setCreateNewPlaylist
          }}>
          {props.children}
      </PBSpotifyContext.Provider>
  };
  
  export default PBSpotifyState;