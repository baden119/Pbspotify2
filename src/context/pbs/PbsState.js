import React, { useReducer } from 'react';
import axios from 'axios';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    GET_SHOWLIST, SET_SHOW, SET_SONGLIST
} from '../types';

const PbsState = props => {
   
  const initialState = {
      ShowList: [],
      SelectedShow: {},
      SongList: []
  };

  const [state, dispatch] = useReducer(PbsReducer, initialState);

  // Get a list of Pbs Shows
  const getShowList = async () => {
      let ShowList = [];
      const res = await axios
      .get('https://airnet.org.au/rest/stations/3pbs/programs');
      res.data.forEach((program, index) => {
        if(program.programRestUrl !== "https://airnet.org.au/rest/stations/3pbs/programs/"){
          //Create ShowList
          ShowList = [...ShowList, {
            id: index,
            name: program.name, 
            url: program.programRestUrl
          }];
        };
      dispatch({
        type: GET_SHOWLIST,
        payload: ShowList
      });
    });
  };

  // Save selected show info to state.
  const setShow = (show) => {
    dispatch({
      type: SET_SHOW,
      payload: show
    });
  };

  // Save Songs from selected episode to state.

    const setSongList = (songlist) =>{
      dispatch({
        type: SET_SONGLIST,
        payload: songlist
      });
    };

    return <PbsContext.Provider
        value={{
        ShowList: state.ShowList,
        SelectedShow: state.SelectedShow,
        SongList: state.SongList,
        getShowList,
        setShow,
        setSongList
        }}>
        {props.children}
    </PbsContext.Provider>
};

export default PbsState;