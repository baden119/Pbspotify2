import React, { useReducer } from 'react';
import axios from 'axios';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    GET_SHOWLIST, SHOW_SELECT_TEXT
} from '../types';

const PbsState = props => {
   
  const initialState = {
      AppShowList: [],
      ShowSelectText: ''
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

    return <PbsContext.Provider
        value={{
        AppShowList: state.AppShowList,
        ShowSelectText: state.ShowSelectText,
        getShowList,
        setShowSelectText
        }}>
        {props.children}
    </PbsContext.Provider>
};

export default PbsState;