import {
        GET_SHOWLIST,
    SET_SHOW,
        SHOW_SELECT_TEXT 
    } from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_SHOWLIST:
            return {
            ...state,
            ShowList: action.payload
            };
        case SHOW_SELECT_TEXT:
            return{
            ...state,
            ShowSelectText: action.payload
            };
        case SET_SHOW:
            return{
            ...state,
            SelectedShow: action.payload
            };
        default:
            return state;
    }
};