import React, { useReducer } from 'react';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    SET_SONGLIST
} from '../types';

const PbsState = props => {
   
  const initialState = {
    SongList: []
  };

  const [state, dispatch] = useReducer(PbsReducer, initialState);

  // Get Songlist for selected show.
const setSongList = (songlist) =>{

  dispatch({
    type: SET_SONGLIST,
    payload: songlist
  });
};

    return <PbsContext.Provider
        value={{
        SongList: state.SongList,
        setSongList
        }}>
        {props.children}
    </PbsContext.Provider>
};

export default PbsState;