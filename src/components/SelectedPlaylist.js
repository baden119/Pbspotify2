import React, { useContext, useEffect, useState } from 'react';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PBSpotifyContext from "../context/pbspotify/pbspotifyContext";

function SelectedPlaylist() {

    const pbspotifyContext = useContext(PBSpotifyContext);
    const [OldPlaylistTracks, setOldPlaylistTracks] = useState([]);

    useEffect(() => {
        setOldPlaylistTracks([]);
        if(pbspotifyContext.Spotify_ID){

            //TODO for consistanst this could be replaced with asynx/await
            pbspotifyContext.Spotify_API.getPlaylistTracks(pbspotifyContext.SelectedPlaylist.id).then(
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
    }, [pbspotifyContext.SelectedPlaylist, pbspotifyContext.SpotifySearchResults]);

    
    return (
        <Col xs={4}>
            <h5>Playlist: {pbspotifyContext.SelectedPlaylist.name}</h5>
            <ul>
                {OldPlaylistTracks.map((item) =>  (
                    <li key={item.id}>{item.track} / {item.artist}</li>
                ))}
            </ul>
        </Col>
    )
}

export default SelectedPlaylist
