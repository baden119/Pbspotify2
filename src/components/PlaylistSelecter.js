import React, { useState, useContext, useEffect } from "react";
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";

function PlaylistSelecter() {
    const pbspotifyContext = useContext(PBSpotifyContext);
    
    useEffect(() => {
        pbspotifyContext.Spotify_API.getUserPlaylists(pbspotifyContext.Spotify_ID.id).then(
            function (data) {
                setplaylists(data.items);
                pbspotifyContext.setSelectedPlaylist(data.items[0])
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
                pbspotifyContext.setSelectedPlaylist(playlist);

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
