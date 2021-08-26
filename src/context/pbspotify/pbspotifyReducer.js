import {
    SET_SPOTIFY_API,
    SET_SPOTIFY_ID,
    SET_SELECTED_PLAYLIST,
    SET_SONGLIST,
    SET_COMPLETED_SEARCH,
    SET_PLAYLIST_TRACKS,
    SET_LOADING,
    SET_RESULT_COUNT
    } from '../types';

    // eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
            case SET_SPOTIFY_API:
                return {
                ...state,
                Spotify_API: action.payload
                };
            case SET_SPOTIFY_ID:
                return {
                ...state,
                Spotify_ID: action.payload
                };
            case SET_SELECTED_PLAYLIST:
                return {
                ...state,
                SelectedPlaylist: action.payload
                };
            case SET_SONGLIST:
                return {
                ...state,
                SongList: action.payload
                };
            case SET_PLAYLIST_TRACKS:
                return {
                ...state,
                PlaylistTracks: action.payload
                };
            case SET_COMPLETED_SEARCH:
                return {
                ...state,
                CompletedSearch: action.payload
                };
            case SET_LOADING:
                return {
                ...state,
                Loading: action.payload
                };
            case SET_RESULT_COUNT:
                return {
                ...state,
                ResultCount: action.payload
                };
        default:
            return state;
    }
};
