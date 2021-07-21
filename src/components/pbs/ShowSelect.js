import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import PbsContext from '../../context/pbs/pbsContext';
import SpotifyContext from '../../context/spotify/spotifyContext';

const Showselect = () => {

    const pbsContext = useContext(PbsContext);
    const spotifyContext = useContext(SpotifyContext);
    
    // Set number of episodes to fetch
    const episodeCount = 3;

    const [selectedShow, setSelectedShow] = useState(JSON.parse(localStorage.getItem('localShowStorage')) || {});
    const [showList, setShowList] = useState([]);

  
    useEffect(() => {
        getShowList();
        // eslint-disable-next-line
        }, []);

    useEffect(() => {
        getSongList();
        spotifyContext.setSpotifySearchResults([])
        localStorage.setItem('localShowStorage', JSON.stringify(selectedShow));
        // eslint-disable-next-line
        }, [selectedShow]);
 

    // Get a list of Pbs Shows, called by useEffect on render.
    const getShowList = async () => {
        let ShowList = [{id: 0, name: 'Select a PBS Show', url: null}];
        try{
            const res = await axios.get('https://airnet.org.au/rest/stations/3pbs/programs');
            res.data.forEach((program, index) => {
                // Issue with API data, some show items lack a unique URL, this ignores such items.
                if(program.programRestUrl !== "https://airnet.org.au/rest/stations/3pbs/programs/"){
                    //Create ShowList
                    ShowList = [...ShowList, {
                        id: index,
                        name: program.name, 
                        url: program.programRestUrl
                    }];
                };
            setShowList(ShowList)
            });
        }catch(e) {
            console.error('PBS Show List Query', e);
        }
    };

    // Get Song list for selected show, called by useEffect on show selection.
    // Structure of async functions taken from 
    // https://www.taniarascia.com/promise-all-with-async-await/
    const getSongList = () =>{

        const getEpisodeList = async () => {
            if (selectedShow.url != null){
                let episodeList = [];
                //Loop through all episodes episodes of selected show
                try{
                    let res = await axios.get(`${selectedShow.url}/episodes?numAfter=${episodeCount}&numBefore=${episodeCount}`)
                    res.data.forEach((episode) => {
                        episodeList = [...episodeList, episode];
                    })
                    // Sort episodes by date (newest first)
                    episodeList.sort(function (a, b) {
                        return new Date(b.start) - new Date(a.start);
                        });
                    return episodeList;
    
                } catch(e) {
                    console.error('Episode List Query', e);
                }
            };
        };

        const getEpisodeData = async (episode) => {
            try {
                let response = await axios.get(`${episode.episodeRestUrl}/playlists`)
                return (response.data);
            }catch(e) {
                console.error('Episode Data Query', e);
            }
        };
        
        const runAsyncFunctions = async () => {
            if (selectedShow.url != null){

                const episodes = await getEpisodeList()
                const songList = await Promise.all(
                    episodes.map(async (episode) => {
                        let episodeSongList = [];
                        const episodedata = await getEpisodeData(episode)
                            episodedata.forEach((song, index) => {
                                episodeSongList = [...episodeSongList, {
                                    id: song.id,
                                    track: song.track, 
                                    artist: song.artist,
                                    date: episode.start,
                                    index: index
                                }]
                            })
                        return episodeSongList
                    })
                )
                pbsContext.setSongList(songList.flat());
            };
        
        }
    
    runAsyncFunctions();
};


  // Handler for Show Selection dropdown.
  const showSelectionHandler = (e) =>{
    showList.forEach((show) => {
        if(String(show.id) === e.target.value){
            // Save show info state
            setSelectedShow(show);
        }
    });
    };

    return (
        <div style={showSelectStyle}>
            <select name="selected show" id="show_select_dropdown" value ={selectedShow.id} onChange={e => showSelectionHandler(e)}>
                {showList.map((show) => {
                    return (
                        show.id === selectedShow.id ?
                        <option key={show.id} value={show.id} >{show.name}</option>
                        :
                        <option key={show.id} value={show.id} >{show.name}</option>
                    )
                })};
            </select>
        </div>
    )
}

const showSelectStyle = {
    display: 'grid',
    // backgroundColor: 'yellow',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
};

export default Showselect

