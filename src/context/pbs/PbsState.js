import React, { useReducer } from 'react';
import axios from 'axios';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    GET_SHOWLIST, SET_SHOW, SHOW_SELECT_TEXT
} from '../types';

const PbsState = props => {
   
  const initialState = {
      ShowList: [],
      ShowSelectText: '',
      SelectedShow: {}
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

  // Show Select Component Text
  // For testing only
  const setShowSelectText = () =>{
    dispatch({
      type: SHOW_SELECT_TEXT,
      payload: 'Context State Text Set'
    });
    setTimeout(()=> (dispatch({
      type: SHOW_SELECT_TEXT,
      payload: ''
    })), 4500);
  };

  // Save selected show info to state.
  const setShow = (show) => {
    dispatch({
      type: SET_SHOW,
      payload: show
    });
  };

    return <PbsContext.Provider
        value={{
        ShowList: state.ShowList,
        ShowSelectText: state.ShowSelectText,
        SelectedShow: state.SelectedShow,
        getShowList,
        setShowSelectText,
        setShow
        }}>
        {props.children}
    </PbsContext.Provider>
};

export default PbsState;