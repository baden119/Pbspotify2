import React, { useReducer } from 'react';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    // SET_SHOW,
    SET_SONGLIST
} from '../types';

const PbsState = props => {
   
  const initialState = {
      SongList: []
  };

  const [state, dispatch] = useReducer(PbsReducer, initialState);

  // // Save selected show info to state.
  // const setShow = (show) => {
  //   dispatch({
  //     type: SET_SHOW,
  //     payload: show
  //   });
  // };

  // Get Songlist for selected show.
const setSongList = (songlist) =>{

  dispatch({
    type: SET_SONGLIST,
    payload: songlist
  });

};

    return <PbsContext.Provider
        value={{
        // ShowList: state.ShowList,
        // SelectedShow: state.SelectedShow,
        SongList: state.SongList,
        // setShow,
        setSongList
        }}>
        {props.children}
    </PbsContext.Provider>
};

export default PbsState;