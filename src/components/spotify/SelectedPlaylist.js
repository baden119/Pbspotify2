import React, { useContext, useEffect, useState } from 'react';
import SpotifyContext from "../../context/spotify/spotifyContext";

function SelectedPlaylist() {

    const spotifyContext = useContext(SpotifyContext);
    const [OldPlaylistTracks, setOldPlaylistTracks] = useState([]);

    useEffect(() => {
        setOldPlaylistTracks([]);
        if(spotifyContext.Spotify_ID){
            spotifyContext.Spotify_API.getPlaylistTracks(spotifyContext.SelectedPlaylist.id).then(
                function (data) {
                    data.items.forEach((item, index) => {
                        setOldPlaylistTracks(OldPlaylistTracks => [...OldPlaylistTracks, {id: index, track: item.track.name, artist: item.track.artists[0].name}]);
                    })
                },
                function (err) {
                    console.error(err);
                }
            );
        };
        // eslint-disable-next-line 
    }, [spotifyContext.SelectedPlaylist]);


    return (
        <div>
            <h5>Playlist: {spotifyContext.SelectedPlaylist.name}</h5>
            {/* TODO css class for background colour to diff old playlist tracks. */}
            <ul>
            {OldPlaylistTracks.map((item) =>  (
            <li key={item.id}>{item.track} / {item.artist}</li>
             ))}
            </ul>
        </div>
    )
}

export default SelectedPlaylist
