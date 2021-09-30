import React, {useContext} from 'react'
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";

    function TodoList() {

        const pbspotifyContext = useContext(PBSpotifyContext);

        return (
        <div>
            Todo List
            <ul>
                <li style={{textDecorationLine: pbspotifyContext.Spotify_ID ? 'line-through' : 'none'}}>Login to Spotify</li>
                <li style={{textDecorationLine: (Object.keys(pbspotifyContext.SelectedPlaylist).length !== 0) ? 'line-through' : 'none'}}>Create or Choose a Spotify Playlist</li>
                <li style={{textDecorationLine: ((pbspotifyContext.SongList).length !== 0) ? 'line-through' : 'none'}}>Choose a PBS Show</li>
                <li style={{textDecorationLine: pbspotifyContext.CompletedSearch ? 'line-through' : 'none'}}>Search Spotify for Songs</li>
            </ul>
        </div>
    )
}

export default TodoList
