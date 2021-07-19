import React, {useContext} from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SpotifyContext from "../../context/spotify/spotifyContext";
import SelectedPlaylist from './SelectedPlaylist';


const Searcher = () => {

  const pbsContext = useContext(PbsContext);
  const spotifyContext = useContext(SpotifyContext);


  const cleanString = (string) =>{
        string=string.split('-')[0]
        string=string.split('(')[0]
        string=string.split('+')[0]
        string=string.split('[')[0]
        string=string.split('&')[0]
        string=string.split('ft.')[0]
        string=string.split('feat.')[0]
        string=string.split('feat')[0]
        string=string.split('FT')[0]
        string=string.split('Ft.')[0]
        
        // Just remove dont cut rest of string.
        // string=string.split('|')[0]
        return string;
};

  //Uses Spotify API to search through PBS Songlist. 
  //Saves results to Spotify Context (SpotifySearchResults)
  //Can change search results limit here
  
  const SpotifySearch = async () => {
    
    const resultsList = await Promise.all(pbsContext.SongList.map(async (song) => {
      try{

        const res = await spotifyContext.Spotify_API.searchTracks((song.track +" "+ song.artist), { limit: 1 });
        
        if (typeof res.tracks.items[0] !== 'undefined') {
          // console.log(res.tracks.items[0].artists[0].name, res.tracks.items[0].name, song);
          //TODO SAVE TRACK INFO
          return {...song, spotifyResponse: res.tracks.items[0]};
        }else{
            const res = await spotifyContext.Spotify_API.searchTracks((cleanString(song.track) +" "+ cleanString(song.artist)), { limit: 1 });
            // console.log("<<Advanced>>", res.tracks.items[0].artists[0].name, res.tracks.items[0].name, song);
            return {...song, spotifyResponse: res.tracks.items[0]};
            //TODO SAVE TRACK INFO
        }
        //Catch syntax taken from https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      }catch(err){
        if (err.response) {
          console.log("Response Error", err.response.data)
          // client received an error response (5xx, 4xx)
        } else if (err instanceof TypeError) {
          console.log("DATA NOT FOUND, ", song.track, song.artist, song)
        } 
        else if (err.request) {
          // client never received a response, or request never left
        } else {
          console.error("Spotify Search", err);
          // anything else
        }

      }
    }))

    // console.log("GET SEARCHIN", resultsList);
    // console.log(pbsContext.SongList);
    // pbsContext.setSongList(resultsList);
  };

  const saveSongs = () => {
    let URI_array = []

    spotifyContext.SpotifySearchResults.forEach((result) => {
      if(result.data.length){
        URI_array = [...URI_array, result.data[0].uri]
      }
    });

    spotifyContext.Spotify_API.addTracksToPlaylist(spotifyContext.SelectedPlaylist.id, URI_array).then(
      function (data) {
        console.log(data)
        //Create Clear input functions in both context!

        
        // SpotifyContext.setselectedPlaylist();
        // SpotifyContext.setSpotifySearchResults();
        // PbsContext.setShow();
        //Alert Playlist Save Success.
        //Need to update Selected Playlist, somehow.
      },
      function (err) {
        console.error(err);
      },
    )
  };


  const renderSearchButton = () => {
    if (spotifyContext.Spotify_API != null){
    return (
      <div>
        <button onClick={ () => SpotifySearch()}>Search</button> 
        <h5>Songs in State: {pbsContext.SongList.length}</h5>
      </div>
    )
  }
  else
    return (
      <h3>Login with Spotify to Search</h3>
    )
  };
 
  const renderSaveSongsButton = () => {
    if(spotifyContext.Spotify_API != null && Object.keys(spotifyContext.SelectedPlaylist).length !== 0 && spotifyContext.SpotifySearchResults.length){
      return(
        <button onClick={ () => saveSongs()}>Save Songs to Playlist</button>
      )
    }
    else
      return(
        <span>Criteria not met yet</span>
      )

  };

  return (
    <div style ={searcherStyle}>
      <div>
        {renderSearchButton()}
      </div>
      <div>
        {renderSaveSongsButton()}
      </div>

    </div>
  )
};
const searcherStyle = {
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateColumns:'repeat(2, 70% 30%)'
};

export default Searcher