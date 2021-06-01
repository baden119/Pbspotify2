import React, { useReducer } from 'react';
import axios from 'axios';
import PbsContext from './pbsContext';
import PbsReducer from './pbsReducer';
import {
    GET_SHOWLIST, SET_SHOW, SET_SONGLIST
} from '../types';
import SonglistComparison from '../../components/spotify/SonglistComparison';

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

  // Get Songlist for selected show.
    const setSongList = async () =>{
      let SongList = [];
        if (state.SelectedShow.url !== undefined){
          axios.get(`${state.SelectedShow.url}/episodes`)
          .then(function (response) {
            response.data.forEach((episode, index) => {
              axios.get(`${episode.episodeRestUrl}/playlists`)
              .then(function (response) {
                if (SongList.length < 100){
                  response.data.map((SongData) => (
                    SongList = [...SongList, {
                      track: SongData.track, 
                      artist: SongData.artist 
                    }]
                  ));
                };
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