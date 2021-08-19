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
    const resultsList = [];
    await Promise.all(pbspotifyContext.SongList.map(async (song) => {
        const result = await song.searchSpotify(pbspotifyContext.Spotify_API);
        if (result === false){
            const advancedResult = await song.advancedSearchSpotify(pbspotifyContext.Spotify_API);
                if (advancedResult === false){
                    resultsList.push(song);
                } else resultsList.push(advancedResult);
        }else resultsList.push(result);
    }));
    const sortedList = resultsList.sort(function (a, b) {
        return a.id - b.id;
      });
      alert.info("Search Complete.")
    pbspotifyContext.setSongList(sortedList);
    pbspotifyContext.setCompletedSearch(true);
};


  const saveSongs = () => {
    let URI_array = [];

    // // Spotify has a limit on how many songs can be added to a playlist with one request.
    // const API_limit = 99;

    // //TODO Clean up, and try to understand this code a bit better
    // spotifyContext.SpotifySearchResults.forEach((song) => {
    //   if(song.spotifyResponse){
    //     URI_array = [...URI_array, song.spotifyResponse.uri]
    //   }
    // });

    // let adjusted_arrays = URI_array.reduce((adjusted, item, index) => {
    //   const limit_index = Math.floor(index/API_limit)

    //   if(!adjusted[limit_index]){
    //     adjusted[limit_index] = [] //Start a new limited array
    //   }        

    //     adjusted[limit_index].push(item)
    //     return adjusted
    //   }, [])
    //  console.log(adjusted_arrays)
    
    //  adjusted_arrays.forEach((array) => {

    //      spotifyContext.Spotify_API.addTracksToPlaylist(spotifyContext.SelectedPlaylist.id, array).then(
    //        function (data) {
    //          console.log("SaveSongs Result", data)
    //         },
    //         function (err) {
    //           console.error(err);
    //         },
    //         )
    //       })
    //       alert.success("Success! Songs saved to Spotify Playlist")

  };


  const renderSearchButton = () => {
    if (pbspotifyContext.Spotify_API != null){
    return (
      <Fragment>
        <Button variant="info" size="lg" onClick={() => SpotifySearch()}>Search Spotify for Songs</Button> 
      </Fragment>
    )
  }
  else
    return (
      <h3>Login with Spotify to Search</h3>
    )
  };
 
  const renderSaveSongsButton = () => {
    if(pbspotifyContext.Spotify_API != null && Object.keys(pbspotifyContext.SelectedPlaylist).length !== 0 && pbspotifyContext.SongList.length){
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
    <Row>
      <Col xs={8}>
        {renderSearchButton()}
      </Col>
      <Col>
        {renderSaveSongsButton()}
      </Col>

    </Row>
  )
};

export default Searcher