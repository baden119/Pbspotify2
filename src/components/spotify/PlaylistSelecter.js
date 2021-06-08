import React, { useState, useContext, useEffect } from "react";
import SpotifyContext from "../../context/spotify/spotifyContext";

function PlaylistSelecter() {
    const spotifyContext = useContext(SpotifyContext);
    
    useEffect(() => {
        spotifyContext.Spotify_API.getUserPlaylists(spotifyContext.Spotify_ID.id).then(
            function (data) {
                setplaylists(data.items);
                spotifyContext.setselectedPlaylist(data.items[0])
            },
            function (err) {
                console.error(err);
            }
        );
    // eslint-disable-next-line
    }, []);
    
    // State used to hold spotify users existing playlists.
    const [playlists, setplaylists] = useState([]);
  
    // Once a playlist is selected, it is saved into context.
    const onChangeHandler = event => {
        playlists.forEach((playlist) => {
            if(playlist.id === event.target.value){
                spotifyContext.setselectedPlaylist(playlist);

        }});
      };
  
      return (
          <div>
          <select name="PlaylistSelecter" id="PlaylstSelecer" onChange={onChangeHandler}>
              {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
              ))}
          </select>
          </div>
      )
  };

export default PlaylistSelecter
