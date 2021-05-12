import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import PbsContext from '../../context/pbs/pbsContext';

function EpisodeInfo(props) {

    const pbsContext = useContext(PbsContext);

    useEffect(() => {
        if(typeof props.episode.episodeRestUrl !== "undefined"){
            getSongList();
        }
        // eslint-disable-next-line
      }, [props.episode]);

    const [SongList, setSongList] = useState([]);

    const getSongList = async () =>{
        let PlayList = [];
        const res = await axios
        .get(`${props.episode.episodeRestUrl}/playlists`)
        res.data.forEach((song, index) => {
            //Create Songlist
            PlayList = [...PlayList,{
                key: index,
                artist: song.artist,
                track: song.track
            }]
        });
        setSongList(PlayList);
        pbsContext.setSongList(PlayList);
    };
    
    return (
        <div>
            <h2>{props.episode.title}</h2>
            <p>{props.episode.description}</p>
            <ul>
            {SongList.map((song) => (
                <li key={song.key}>{song.artist} / {song.track}</li>
                ))}
            </ul>
        </div>
    )
}

export default EpisodeInfo
