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
        // console.log("useEffect 1")
        getShowList();
        // eslint-disable-next-line
        }, []);

    useEffect(() => {
        // console.log("useEffect 2")
        getEpisodeList();
        // eslint-disable-next-line
        }, [selectedShow]);
 
    useEffect(() => {
        // console.log("useEffect 3")
        setSongList([]);
        getSongList();
        // eslint-disable-next-line
        }, [episodes]);

    // useEffect(() => {
    //     console.log("useEffect 4")
    //     let tempSongList = songList;

    //     tempSongList.sort(function (a, b) {
    //         return new Date(b.date) - new Date(a.date);
    //     });
    //     // setSongList(tempSongList.slice(0, 15));
    //     // eslint-disable-next-line
    //     }, [songList, setSongList]);
        

    // Get a list of Pbs Shows, called by useEffect on render.
    const getShowList = async () => {
        let ShowList = [{id: 0, name: 'Select a PBS Show', url: null}];
        try{
            const res = await axios.get('https://airnet.org.au/rest/stations/3pbs/programs');
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
        }catch(e) {
            console.error('PBS Show List Query', e);
        }
        
    };


    // Get Episode list for selected show, called by useEffect on show selection.
    const getEpisodeList = async () =>{
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
                setEpisodes(episodeList);

            } catch(e) {
                console.error('Episode List Query', e);
            }
        };
  };

  
  // So what i want is one songlist for the selected show, but ordered by the most recent episode first.
  // The issue im having is that declaring vairable to hold the data at the start of the function dosen't seem
  // to scope, and even if the list is populated inside the loop, at the end of the loop when i want to sort 
  // and save the list into state, the data is no longer there.
  // there is also an issue here with async, so oftern an evaluation of a vairable at the bottom of the function will be
  // executed before the completion of all the async calls. 
  
//So i think by using promise.all() i can find a solution. Basically i have to split this function into two 
// an async function that returns a promise (similar to CT's wordGIF)
// and a function that creates an array of these promises and resolves them in order.
// The songlist will be the result of this second function
  const getSongList = () =>{
    console.log("start")
    const getUsers = () => {
        return new Promise((resolve, reject) => {
          return setTimeout(
            () => resolve([{ id: 'jon' }, { id: 'andrey' }, { id: 'tania' }]),
            2000
          )
        })
      }
      const object1 = getUsers();
      console.log(1, object1);
    
    const asyncTest = async () => {
        const object2 = await getUsers();
        console.log(2, object2);
    }
    
    asyncTest();

    

    // Loop through playlist for each episode
    // episodes.forEach((episode) => {
    //     // Get request for playlist for each episode
    //     let res = axios.get(`${episode.episodeRestUrl}/playlists`)
    //     console.log('promise time', res.data)
        
    // });
    // try {
    //     }catch(e) {
    //         console.error('Song List Query', e);
    //     }
        
    
    // response.data.map((SongData) => (
        //     SongList = [...SongList, {
            //         id: SongData.id,
            //         track: SongData.track, 
            //         artist: SongData.artist,
            //         date: episode.start
            //     }]
            // ));

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

