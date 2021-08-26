import React, {useContext, Fragment} from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";
import { useAlert } from 'react-alert'

const Searcher = () => {

  const pbspotifyContext = useContext(PBSpotifyContext);

  const alert = useAlert()
  
  const SpotifySearch = async () => {

    alert.info("Search Started")
    pbspotifyContext.setLoading(true);
    const resultsList = [];
    await Promise.all(pbspotifyContext.SongList.map(async (song) => {
        const result = await song.searchSpotify(pbspotifyContext.Spotify_API);
        if (result === false){
            const advancedResult = await song.advancedSearchSpotify(pbspotifyContext.Spotify_API);
                if (advancedResult === false){
                    resultsList.push(song);
                    pbspotifyContext.setResultCount(resultsList.length)
                } else resultsList.push(advancedResult);
        }else {
          resultsList.push(result);
          pbspotifyContext.setResultCount(resultsList.length)
        }
    }));
    const sortedList = resultsList.sort(function (a, b) {
        return a.id - b.id;
      });
      alert.info("Search Complete.")
    pbspotifyContext.setSongList(sortedList);
    pbspotifyContext.setCompletedSearch(true);
    pbspotifyContext.setLoading(false);
};


  const saveSongs = () => {
    let URI_array = [];

    // Spotify has a limit on how many songs can be added to a playlist with one request.
    const API_limit = 99;

    //TODO Clean up, and try to understand this code a bit better
    pbspotifyContext.SongList.forEach((song) => {
      if(song.spotify_match_found && !song.exclude_result){
        URI_array = [...URI_array, song.spotify_URI]
      }
    });

    let adjusted_arrays = URI_array.reduce((adjusted, item, index) => {
      const limit_index = Math.floor(index/API_limit)

      if(!adjusted[limit_index]){
        adjusted[limit_index] = [] //Start a new limited array
      }        

      adjusted[limit_index].push(item)
      return adjusted
    }, [])
    
    adjusted_arrays.map(async(array) => {
      try {
        const res = await pbspotifyContext.Spotify_API.addTracksToPlaylist(pbspotifyContext.SelectedPlaylist.id, array);
        fetchPlaylistTracks();
        } catch(err) {
          console.error(err);
        }
    })
    alert.success("Success! Songs saved to Spotify Playlist")

    //Duplicated code from SelectedPlaylist Component
    const fetchPlaylistTracks = async () => {
      let PlaylistTracks = [];
        try{
            const res = await pbspotifyContext.Spotify_API.getPlaylistTracks(pbspotifyContext.SelectedPlaylist.id)
            res.items.forEach((item, index) => {
                PlaylistTracks.push({id: index, track: item.track.name, artist: item.track.artists[0].name})
            })
            pbspotifyContext.setPlaylistTracks(PlaylistTracks);
        } catch(err) {
            console.error(err);
        }
    };
  };

  const renderSearchButton = () => {
    if (pbspotifyContext.Spotify_API != null){
      return (
          <Button variant="primary" size="lg" onClick={() => SpotifySearch()}>Search Spotify for Songs</Button> 
      )
    }
  };
 
  const renderSaveSongsButton = () => {
    //logged in to render anything
    if (pbspotifyContext.Spotify_API != null){
      if(Object.keys(pbspotifyContext.SelectedPlaylist).length !== 0 && pbspotifyContext.CompletedSearch){
        return(
          <Button onClick={ () => saveSongs()} size="lg">Save Songs to Playlist</Button>
        )
      }
    }
  };

  return (
    <Row>
      <Col>
        {renderSearchButton()}
      </Col>
      <Col>
        {renderSaveSongsButton()}
      </Col>

    </Row>
  )
};

export default Searcher