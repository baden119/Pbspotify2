import React, { useReducer } from 'react';
import axios from 'axios';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    GET_SHOWLIST
} from '../types';

const PbsState = props => {
    const initialState = {
        showlist: []
    };

const [state, dispatch] = useReducer(PbsReducer, initialState);

// Get a list of Pbs Shows
async GetShowList() {
    const res = await axios
    .get('https://airnet.org.au/rest/stations/3pbs/programs');
    // console.log(res.data)
    // res.data.forEach((program, index) => {
    // if(program.programRestUrl !== "https://airnet.org.au/rest/stations/3pbs/programs/"){
    //     this.setState({Showlist: [...this.state.Showlist, {id: index, name: program.name, url: program.programRestUrl}]});
    // }
    // })
    dispatch({
        type: showlist,
        payload: 'Data Payload Recieved'
    });  
};

return <PbsContext.Provider
value={{
    Showlist: state.Showlist,
    GetShowList
}}
>
{props.children}
</PbsContext.Provider>
};

export default PbsState;