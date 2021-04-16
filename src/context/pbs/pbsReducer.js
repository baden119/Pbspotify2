import Showselect from '../../components/pbs/Showselect';
import {
        GET_SHOWLIST,
        SHOW_SELECT_TEXT 
    } from '../types';

  export default (state, action) => {
    switch (action.type) {
        case GET_SHOWLIST:
            return {
            ...state,
            AppShowList: action.payload
            };
        case SHOW_SELECT_TEXT:
            return{
            ...state,
            ShowSelectText: action.payload
            };
        default:
            return state;
    }
};