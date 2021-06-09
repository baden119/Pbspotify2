import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
// import PbsContext from '../../context/pbs/pbsContext';

const Showselect = () => {
    
    // Set number of episodes to fetch
    const episodeCount = 5;

    // Set limit for Songlist size.
    const songCount = 75;

    // const pbsContext = useContext(PbsContext);
    const [selectedShow, setSelectedShow] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [showList, setShowList] = useState([]);
    const [songList, setSongList] = useState([]);

  
    useEffect(() => {
        console.log("useEffect 1")
        getShowList();
        // eslint-disable-next-line
        }, []);

    useEffect(() => {
        console.log("useEffect 2")
        getEpisodeList();
        // eslint-disable-next-line
        }, [selectedShow]);
 
    useEffect(() => {
        console.log("useEffect 3")
        setSongList([]);
        getSongList();
        // eslint-disable-next-line
        }, [episodes]);

    useEffect(() => {
        console.log("useEffect 4")
        let tempSongList = songList;

        tempSongList.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        // console.log(1, tempSongList.length)
        // tempSongList.slice(songCount);
        // console.log(2, tempSongList.length)
        setSongList(tempSongList);
        // eslint-disable-next-line
        }, [songList]);
        

    // Get a list of Pbs Shows, called by useEffect on render.
    const getShowList = async () => {
        let ShowList = [{id: 0, name: 'Select a PBS Show', url: null}];
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
        setShowList(ShowList)
        });
    };


    // Get Episode list for selected show, called by useEffect on show selection.
    const getEpisodeList = async () =>{
        if (selectedShow.url != null){
            let episodeList = [];
            //Loop through all episodes episodes of selected show
            axios.get(`${selectedShow.url}/episodes?numAfter=${episodeCount}&numBefore=${episodeCount}`)
            .then(function (response) {
                response.data.forEach((episode) => {
                    episodeList = [...episodeList, episode];
                })
                //Sort episodes by date (newest first)
                episodeList.sort(function (a, b) {
                    return new Date(b.start) - new Date(a.start);
                  });
                setEpisodes(episodeList);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        };
  };

  const getSongList = async () =>{

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
    //Loop through playlist for each episode
    episodes.forEach((episode) => {
        console.log("ep start:", episode.start);
        //Get request for playlist for each episode
        axios.get(`${episode.episodeRestUrl}/playlists`).then(function (response) {
            response.data.map((SongData) => (
                SongList = [...SongList, {
                    id: SongData.id,
                    track: cleanString(SongData.track), 
                    artist: cleanString(SongData.artist),
                    date: episode.start
                }]
                ));
                setSongList(SongList);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    });
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
            <select name="selected show" id="show_select_dropdown" onChange={e => showSelectionHandler(e)}>
                {showList.map((show) => (
                    <option key={show.id} value={show.id} >{show.name}</option>
                ))};
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

