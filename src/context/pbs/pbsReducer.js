import {
    SET_SONGLIST
    } from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case SET_SONGLIST:
            return{
            ...state,
            SongList: action.payload
            };
        default:
            return state;
    }
};