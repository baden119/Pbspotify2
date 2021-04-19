import {
    GET_SHOWLIST,
    SET_SHOW,
    SET_SONGLIST,
    } from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_SHOWLIST:
            return {
            ...state,
            ShowList: action.payload
            };
        case SET_SHOW:
            return{
            ...state,
            SelectedShow: action.payload
            };
        case SET_SONGLIST:
            return{
            ...state,
            SongList: action.payload
            };
        default:
            return state;
    }
};