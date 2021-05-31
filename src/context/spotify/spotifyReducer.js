import {
    IS_LOGGED_IN
    } from '../types';

    // eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return {
            ...state,
            ShowList: action.payload
            };
        default:
            return state;
    }
};
