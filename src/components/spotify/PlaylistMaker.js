import React, { useState, useContext } from "react";
import SpotifyContext from "../../context/spotify/spotifyContext";
const PlaylistMaker = () => {

    const [userID, setuserID] = useState('');
    const [playlists, setplaylists] = useState([]);
    const [selectedPlaylist, setselectedPlaylist] = useState({});
    const spotifyContext = useContext(SpotifyContext);

    const get_id = async () => {
        spotifyContext.Spotify_API.getMe().then(
            function (data) {
              setuserID(data.id);
            },
            function (err) {
              console.error(err);
            }
          );
      };
    const get_playlists = async () => {
      spotifyContext.Spotify_API.getUserPlaylists(userID).then(
            function (data) {
              setplaylists(data.items);
            },
            function (err) {
              console.error(err);
            }
          );
      };

      const playlistSelection = (e) =>{
        setselectedPlaylist(e.target.value);
    };
    return (
        <div style={playlistMakerStyle}>
            <h3>Create Playlist</h3>
            {/* <input   
                placeholder="Playlist Name" 
                name="playlistName" 
                // value={playlistName} 
                // onChange={onChange}
            />
            <div>
              <textarea
              style={{width: '100%'}}
              type="textarea" 
              placeholder="Description" 
              name="playlistDescription"  
              />
              <button onClick={console.log("click")}>Create Playlist</button>
            </div>   */}


        <button onClick={ () => get_id()}>Get User ID (Temp)</button>
        <button onClick={ () => get_playlists()}>Get Playlists</button>
        <h4>Playlists</h4>
        <select name="selected playlist" id="playlist_select_dropdown" onChange={e => playlistSelection(e)}>
            {playlists.map((playlist, id) => (
                <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
            ))}
        </select>
        </div>
    )
};

const playlistMakerStyle = {
  display: 'grid',
  gridTemplateRows:'repeat(2, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%'

};

export default PlaylistMaker
