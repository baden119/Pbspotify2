import React, { useContext, useEffect } from 'react';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';

function SelectedPlaylist() {
  const { Spotify_API, SelectedPlaylist, setPlaylistTracks, PlaylistTracks } =
    useContext(PBSpotifyContext);

  useEffect(() => {
    let PlaylistTracks = [];
    const fetchPlaylistTracks = async () => {
      try {
        const res = await Spotify_API.getPlaylistTracks(SelectedPlaylist.id);
        res.items.forEach((item, index) => {
          PlaylistTracks.push({
            id: index,
            track: item.track.name,
            artist: item.track.artists[0].name,
          });
        });
        setPlaylistTracks(PlaylistTracks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylistTracks();
    // eslint-disable-next-line
  }, [SelectedPlaylist]);

  return (
    <Col className='selectedPlaylist d-none d-md-block' xs={3}>
      <h5>{SelectedPlaylist.name}</h5>
      <ul>
        {PlaylistTracks.map((item) => (
          <li key={item.id}>
            {item.track} / {item.artist}
          </li>
        ))}
      </ul>
    </Col>
  );
}

export default SelectedPlaylist;
