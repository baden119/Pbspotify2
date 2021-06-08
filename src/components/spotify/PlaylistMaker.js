import React, { useState, useContext } from "react";
import SpotifyContext from "../../context/spotify/spotifyContext";

const PlaylistMaker = () => {

  return (
    <div>
        <input   
            placeholder="Playlist Name" 
            name="playlistName" 
            // value={playlistName} 
            // onChange={onChange}
        />
        <div>
          <textarea
          style={{width: 'auto', display: 'block'}}
          type="textarea" 
          placeholder="Description" 
          name="playlistDescription"  
          />
          {/* <button onClick={console.log("click")}>Create PlayList</button> */}
        </div>  
    </div>
)
}

const playlistMakerStyle = {
  display: 'grid',
  gridTemplateRows:'repeat(2, 1fr)',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%'

};

export default PlaylistMaker
