import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios';
import PbsContext from '../../context/pbs/pbsContext';
import EpisodeInfo from './EpisodeInfo';

const EpisodesDisplay = () => {

    const pbsContext = useContext(PbsContext);

    // This component will display episodes of the selected show. Episodes will be able to be 
    // viewed and selected. 
    // Viewing an episode means seeing a list of songs from that episode.
    // Selecting an episode means adding those songs to a list which will become a spotify playlist.

    const [EpisodeList, setEpisodeList] = useState([]);
    const [SelectedEpisode, setSelectedEpisode] = useState({});

    useEffect(() => {
        setEpisodeList([]);
        getEpisodeList();
        // eslint-disable-next-line
      }, [pbsContext.SelectedShow]);

    const getEpisodeList = async () => {

        if(Object.keys(pbsContext.SelectedShow).length > 1){

        const res = await axios
        .get(`${pbsContext.SelectedShow.url}/episodes?numAfter=0&numBefore=10`)
        res.data.sort((a, b) => a.start < b.start ? 1: -1);
        res.data.forEach((episode, index) => {
            if (!episode.title){
                episode.title = '(No Episode Title Found)'
            };
            setEpisodeList(EpisodeList => [...EpisodeList, {id: index, episodeData: episode}]);
          })
        };
    };

    const SingleEpisode = (episode) => {
        setSelectedEpisode(episode);
    }

    return (
        <div>
            <h2>{pbsContext.SelectedShow.name}</h2>
            {/* <h5>Number of Episodes in State: {EpisodeList.length}</h5> */}

            <div style={episodeStyle}> 
                {EpisodeList.map((episode) => (
                    <div style = {{border: '1px solid black'}} key = {episode.id}>
                        <p>{episode.episodeData.title}
                        <input
                            type="checkbox"
                            // name={episode.id}
                            // onChange={onCheckboxChange(episode.id)}
                        /></p>
                        {episode.episodeData.start}
                        <button onClick={ () => SingleEpisode(episode.episodeData)}>See Info</button>
                    </div>
                ))}
            </div>
            
            <EpisodeInfo episode={SelectedEpisode} />
            
        </div>
    )
}

const episodeStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',
}

export default EpisodesDisplay
