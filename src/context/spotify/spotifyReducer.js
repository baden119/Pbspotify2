import {
    IS_LOGGED_IN, SET_SPOTIFY_API
    } from '../types';

    // eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return {
            ...state,
            ShowList: action.payload
            };
            case SET_SPOTIFY_API:
                return {
                ...state,
                Spotify_API: action.payload
                };
        default:
            return state;
    }
};
