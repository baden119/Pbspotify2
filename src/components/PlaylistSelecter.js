import React, { useState, useContext, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";

function PlaylistSelecter() {
    const pbspotifyContext = useContext(PBSpotifyContext);
    
    useEffect(() => {
        pbspotifyContext.Spotify_API.getUserPlaylists(pbspotifyContext.Spotify_ID.id).then(
            function (data) {
                setplaylists(data.items);
                
                if (Object.keys(pbspotifyContext.SelectedPlaylist).length === 0){
                    pbspotifyContext.setSelectedPlaylist(data.items[0])
                }
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
          <Form>
              <Form.Group>
                <Form.Select name="PlaylistSelecter" id="playlist_select_dropdown" onChange={onChangeHandler} value={pbspotifyContext.SelectedPlaylist.id}>
                    {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                    ))}
                </Form.Select>
              </Form.Group>
          </Form>
      )
  };


export default PlaylistSelecter
