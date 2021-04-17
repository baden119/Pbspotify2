import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios';
import PbsContext from '../../context/pbs/pbsContext';

const EpisodeDisplay = () => {

    const pbsContext = useContext(PbsContext);

    // This component will display episodes of the selected show. Episodes will be able to be 
    // viewed and selected. 
    // Viewing an episode means seeing a list of songs from that episode.
    // Selecting an episode means adding those songs to a list which will become a spotify playlist.

    const [EpisodeList, setEpisodeList] = useState([]);

    useEffect(() => {
        getEpisodeList();
        // eslint-disable-next-line
      }, [pbsContext.SelectedShow]);

    const getEpisodeList = async () => {

        if(Object.keys(pbsContext.SelectedShow).length > 1){

        const res = await axios
        .get(`${pbsContext.SelectedShow.url}/episodes?numAfter=100&numBefore=100`)
        console.log(res.data);
        res.data.sort((a, b) => a.start < b.start ? 1: -1);
        res.data.forEach((episode, index) => {
            if (!episode.title){
                episode.title = '(No Episode Title Found)'
            };
            setEpisodeList(EpisodeList => [...EpisodeList, {id: index, episodeData: episode}]);
          })
        };
    };


    return (
        <div>
            <h3>Episode Display</h3>
            <h2>{pbsContext.SelectedShow.name}</h2>
            <h5>Number of Episodes in State: {EpisodeList.length}</h5>
        </div>
    )
}

export default EpisodeDisplay
