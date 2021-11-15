import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { apiURL } from "../config";


const About = () => {
    
    const [tracksUseage, setTracksUseage] = useState('');
    const [playListsUseage, setPlayListsUseage] = useState('');
    
    useEffect(() => {

        const getUseageStats = async () => {
            try{
                const res = await axios.get(apiURL() + '/api/useage/');
                setTracksUseage(res.data[0].tracks_count);
                setPlayListsUseage(res.data[0].playlists_count);
                console.log(res.data[0])
            }catch(e) {
                console.error(e);
            }
        };

        getUseageStats();
        // eslint-disable-next-line
      }, []);
    
    return (
        <div>
            <h1>About Page</h1>
            <h5>Over {tracksUseage} tracks saved to {playListsUseage} playlists</h5>
        </div>
    )
}

export default About
