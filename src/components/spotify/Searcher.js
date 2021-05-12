import React, { useState, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';

const Searcher = ({ spotify }) => {

    const pbsContext = useContext(PbsContext);
    const [searchField, setsearchField] = useState('');
    const [searchResults, setsearchResults] = useState({});

    const onChange = e => setsearchField(e.target.value)

    const spotify_test= async () => {
      spotify.searchTracks(searchField).then(
          function (data) {
            console.log(data);
            setsearchResults(data.tracks.items);
          },
          function (err) {
            console.error(err);
          }
        );
    };


  return (
    <div>
      <input 
        type="text" 
        placeholder="Search Spotify" 
        name="searchField" 
        value={searchField} 
        onChange={onChange}
      />
      <button onClick={ () => spotify_test()}>Search</button> 

    <h5>Songs in State: {pbsContext.SongList.length}</h5>

    {searchResults.length > 0 && 
    <div>
        <h3>Number of Search Results: {searchResults.length}</h3>
        <h4>Top Result "{searchResults[0].name}" by {searchResults[0].artists[0].name}</h4>
    </div>
    }
        
    </div>
  )
}

export default Searcher