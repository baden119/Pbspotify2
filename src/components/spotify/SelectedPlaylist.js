import React, { useContext, useEffect, useState } from 'react';
import SpotifyContext from "../../context/spotify/spotifyContext";

function SelectedPlaylist() {

    const spotifyContext = useContext(SpotifyContext);
    const [OldPlaylistTracks, setOldPlaylistTracks] = useState([]);

    useEffect(() => {
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
    }, [spotifyContext.SelectedPlaylist]);

    const renderOldPlaylistTracks = () => {
        // for (const item of OldPlaylistTracks) {
        //     return(
        //         <li>{item.track} / {item.artist} ({item.index})</li>
        //     );
        // };
        OldPlaylistTracks.forEach((item) =>  {
        return(
            <li>{item.track} / {item.artist} ({item.index})</li>
        );
        })

    };

    return (
        <div>
            <h3 style={{margin:'0', textAlign: 'center'}}> Spotify PlayList </h3>
            <h5>{spotifyContext.SelectedPlaylist.name}</h5>
            <ul>
                {renderOldPlaylistTracks()}
            </ul>
        </div>
    )
}

export default SelectedPlaylist
