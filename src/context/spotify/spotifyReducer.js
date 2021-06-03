import {
    SET_SPOTIFY_API,
    SET_SPOTIFY_ID,
    SET_SPOTIFY_SEARCH_RESULTS
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
            case SET_SPOTIFY_SEARCH_RESULTS:
                return {
                ...state,
                SpotifySearchResults: action.payload
                };
        default:
            return state;
    }
};
