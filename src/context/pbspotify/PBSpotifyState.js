import React, { useReducer } from 'react';

import PBSpotifyContext from './pbspotifyContext';
import PBSpotifyReducer from './pbspotifyReducer';
import {
  SET_SPOTIFY_API,
  SET_SPOTIFY_ID,
  SET_SONGLIST,
  SET_COMPLETED_SEARCH,
  SET_LOADING,
  SET_RESULT_COUNT,
} from '../types';

const PBSpotifyState = (props) => {
  const initialState = {
    Spotify_API: null,
    Spotify_ID: null,
    SongList: [],
    CompletedSearch: false,
    Loading: false,
    ResultCount: 0,
  };

  const [state, dispatch] = useReducer(PBSpotifyReducer, initialState);

  // Set Spotify Api & User Info
  const setSpotify_API = (Spotify_API) => {
    dispatch({
      type: SET_SPOTIFY_API,
      payload: Spotify_API,
    });
    if (Spotify_API) {
      Spotify_API.getMe().then(
        function (data) {
          dispatch({
            type: SET_SPOTIFY_ID,
            payload: data,
          });
        },
        function (err) {
          console.error(err);
        }
      );
    }
  };

  // Main Songlist, originates from PBS API, and is modified with Spotify searches.
  const setSongList = (songlist) => {
    dispatch({
      type: SET_SONGLIST,
      payload: songlist,
    });
  };

  // Control display behaviour related to Spotify searches
  const setCompletedSearch = (status) => {
    dispatch({
      type: SET_COMPLETED_SEARCH,
      payload: status,
    });
  };

  const setLoading = (status) => {
    dispatch({
      type: SET_LOADING,
      payload: status,
    });
  };

  const setResultCount = (count) => {
    dispatch({
      type: SET_RESULT_COUNT,
      payload: count,
    });
  };

  return (
    <PBSpotifyContext.Provider
      value={{
        Spotify_API: state.Spotify_API,
        Spotify_ID: state.Spotify_ID,
        SongList: state.SongList,
        CompletedSearch: state.CompletedSearch,
        Loading: state.Loading,
        ResultCount: state.ResultCount,
        setSpotify_API,
        setSongList,
        setCompletedSearch,
        setLoading,
        setResultCount,
      }}
    >
      {props.children}
    </PBSpotifyContext.Provider>
  );
};

export default PBSpotifyState;
