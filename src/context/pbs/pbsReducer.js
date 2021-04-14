//Has all actions relating to state

import Showselect from '../../components/pbs/Showselect';
import { GET_SHOWLIST } from '../types';

  export default (state, action) => {
    switch (action.type) {
        case GET_SHOWLIST:
            return {
            ...state,
            showlist: action.payload,
            };
        default:
            return state;
    }
};