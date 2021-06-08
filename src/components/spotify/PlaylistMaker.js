import React, { useState, useContext } from "react";
import SpotifyContext from "../../context/spotify/spotifyContext";

const PlaylistMaker = () => {

  const spotifyContext = useContext(SpotifyContext);
  const [playlistName, setPlaylistName] = useState('');

  const onNameChange = e => setPlaylistName(e.target.value)
  
  const onCreateClick = () =>{
    spotifyContext.Spotify_API.createPlaylist(spotifyContext.Spotify_ID.id, {name: playlistName, public: false, description: "Created by PBSpotify."}).then(
      function (data) {
        spotifyContext.setselectedPlaylist(data);
        //TODO Alert success
        setPlaylistName('');

      },
      function (err) {
        console.error(err);
      }
    )};
  return (
    <div>
        <input   
            placeholder="New Playlist Name" 
            name="playlistName" 
            value={playlistName} 
            onChange={onNameChange}
        />
        <div>
          <button onClick={onCreateClick}>Create PlayList</button>
        </div>  
    </div>
)
}

// const playlistMakerStyle = {
//   display: 'grid',
//   gridTemplateRows:'repeat(2, 1fr)',
//   justifyContent: 'center',
//   alignItems: 'center',
//   textAlign: 'center',
//   width: '100%'

// };

export default PlaylistMaker
