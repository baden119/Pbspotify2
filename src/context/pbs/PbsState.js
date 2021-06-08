import React, { useReducer } from 'react';
import axios from 'axios';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    GET_SHOWLIST, SET_SHOW, SET_SONGLIST
} from '../types';

const PbsState = props => {
   
  const initialState = {
      ShowList: [{
        id: 0,
        name: 'Select a PBS Show', 
        url: null
      }],
      SelectedShow: {},
      SongList: []
  };

  const [state, dispatch] = useReducer(PbsReducer, initialState);

  // Get a list of Pbs Shows
  const getShowList = async () => {
      let ShowList = state.ShowList;
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

  // Get Songlist for selected show.
const setSongList = async () =>{

  // Function to clean up inputs from PBS playlists.
  const cleanString = (string) =>{
    string=string.split('-')[0]
    string=string.split('(')[0]
    string=string.split('+')[0]
    string=string.split('[')[0]
    string=string.split('ft.')[0]
    string=string.split('feat.')[0]
    string=string.split('feat')[0]
    string=string.split('FT')[0]
    
    // Just remove dont cut rest of string.
    // string=string.split('|')[0]
    return string;
  };

  let SongList = [];
  if (state.SelectedShow.url != null){
    //Loop through all episodes episodes of selected show
    axios.get(`${state.SelectedShow.url}/episodes`)
    .then(function (response) {
      response.data.forEach((episode) => {
        //Loop through playlist for each episode
        axios.get(`${episode.episodeRestUrl}/playlists`)
        .then(function (response) {
          //Add songs to songlist. Can control max size of songlist here.
          if (SongList.length < 30){
            response.data.map((SongData) => (
              SongList = [...SongList, {
                id: SongData.id,
                track: cleanString(SongData.track), 
                artist: cleanString(SongData.artist) 
              }]
            ));
          };
          // Sort SongList by id
          SongList.sort(function (a, b){
            return a.id - b.id;
          });
          dispatch({
            type: SET_SONGLIST,
            payload: SongList
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  };
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