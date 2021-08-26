import React, { useState, useContext } from "react";
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAlert } from 'react-alert'

const PlaylistMaker = () => {

  const pbspotifyContext = useContext(PBSpotifyContext);
  const [playlistName, setPlaylistName] = useState('');

  const alert = useAlert()
  const onNameChange = e => setPlaylistName(e.target.value)
  
  const onCreateClick = () =>{
    pbspotifyContext.Spotify_API.createPlaylist(pbspotifyContext.Spotify_ID.id, {name: playlistName, public: false, description: "Created by PBSpotify."}).then(
      function (data) {
        pbspotifyContext.setSelectedPlaylist(data);
        alert.success(data.name + ' Playlist Created!')
        setPlaylistName('');

      },
      function (err) {
        alert.error("Error: Playlist needs a name");
        console.error(err);
      }
    )};
  return (
    <Form>
      <Form.Group >
        <Form.Control 
        type="text" 
        placeholder="New Playlist Name" 
        size="lg" 
        className="textInput"
        name="playlistName" 
        value={playlistName} 
        onChange={onNameChange}/>
        <Button onClick={onCreateClick}>Create Empty PlayList</Button>
      </Form.Group>
    </Form>
)
}

export default PlaylistMaker
