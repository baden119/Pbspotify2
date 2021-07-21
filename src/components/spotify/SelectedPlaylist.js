import React, { useContext, useEffect, useState } from 'react';
import SpotifyContext from "../../context/spotify/spotifyContext";

function SelectedPlaylist() {

    const spotifyContext = useContext(SpotifyContext);
    const [OldPlaylistTracks, setOldPlaylistTracks] = useState([]);

    useEffect(() => {
        setOldPlaylistTracks([]);
        if(spotifyContext.Spotify_ID){

            //TODO for consistanst this could be replaced with asynx/await
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
        // TODO This refresh on search result feels super hacky and bad design
    }, [spotifyContext.SelectedPlaylist, spotifyContext.SpotifySearchResults]);

    
    return (
        <div>
            <h5>Playlist: {spotifyContext.SelectedPlaylist.name}</h5>
            <ul>
                {OldPlaylistTracks.map((item) =>  (
                    <li key={item.id}>{item.track} / {item.artist}</li>
                ))}
            </ul>
        </div>
    )
}

export default SelectedPlaylist
