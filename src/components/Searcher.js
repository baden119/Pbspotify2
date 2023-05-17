import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { useAlert } from 'react-alert';

const Searcher = () => {
  const {
    CompletedSearch,
    SongList,
    setLoading,
    setResultCount,
    Spotify_API,
    SelectedPlaylist,
    setSongList,
    setPlaylistTracks,
    setCompletedSearch,
  } = useContext(PBSpotifyContext);

  const delayTime = 0;
  const alert = useAlert();

  const SpotifySearch = async () => {
    const delay = () =>
      new Promise((resolve) => setTimeout(resolve, delayTime));

    // Strips common symbols and abbreviations from data provided by the PBS API, used if initial search returns no results.
    const stripString = (string) => {
      if (string === null) {
        return '';
      }
      string = string.split('-')[0];
      string = string.split('(')[0];
      string = string.split('+')[0];
      string = string.split('[')[0];
      string = string.split('&')[0];
      string = string.split('ft.')[0];
      string = string.split('feat.')[0];
      string = string.split('feat')[0];
      string = string.split('FT')[0];
      string = string.split('Ft.')[0];

      // Just remove dont cut rest of string.
      // string=string.split('|')[0]
      return string;
    };

    // Updates a song object with data returned from the Spotify API
    const updateSongWithResults = (song, response) => {
      song.spotify_track = response.tracks.items[0].name;
      song.spotify_artist = response.tracks.items[0].artists[0].name;
      song.spotify_URI = response.tracks.items[0].uri;
      song.exclude_result = false;
      console.log(song);
      return song;
    };

    const searchAndSetSongData = async (song) => {
      // Delay to throttle requests to Spotify API (avoids 429 response errors)
      await delay();
      try {
        // Sending request to Spotify API
        const response = await Spotify_API.searchTracks(
          song.pbs_track + ' ' + song.pbs_artist,
          { limit: 1 }
        );
        // If the response includes items it is presumed to have found a match and the Song object is updated with data returned from Spotift API.
        if (response.tracks.items[0]) {
          updateSongWithResults(song, response);
        } else {
          // If there are no items in the response the inputs failed to find a match and an 'Advanced Search' is attempted with various symbols and common abbreviations removed.
          await delay();
          console.log('Advanced searching', song.id);
          const response = await Spotify_API.searchTracks(
            stripString(song.pbs_track) + ' ' + stripString(song.pbs_artist),
            { limit: 1 }
          );
          // If the advanced search response includes items it is assumed to have found a match.
          if (response.tracks.items[0]) {
            updateSongWithResults(song, response);
          } else {
            // No items in the response from the advanced search indicates the song is not in the Spotify database.
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
      return song;
    };

    setLoading(true);
    let ResultCount = 0;
    const songListCopy = [...SongList];
    for (let i = 0; i < songListCopy.length; i++) {
      await searchAndSetSongData(songListCopy[i]);
      ResultCount++;
      setResultCount(ResultCount);
      setSongList(songListCopy);
    }

    alert.info('Search Complete.');
    setCompletedSearch(true);
    setLoading(false);
    setResultCount(0);
  };

  const saveSongs = () => {
    let URI_array = [];

    // Spotify has a limit on how many songs can be added to a playlist with one request.
    const API_limit = 99;

    SongList.forEach((song) => {
      if (song.spotify_match_found && !song.exclude_result) {
        URI_array = [...URI_array, song.spotify_URI];
      }
    });

    let adjusted_arrays = URI_array.reduce((adjusted, item, index) => {
      const limit_index = Math.floor(index / API_limit);

      if (!adjusted[limit_index]) {
        adjusted[limit_index] = []; //Start a new limited array
      }

      adjusted[limit_index].push(item);
      return adjusted;
    }, []);

    adjusted_arrays.map(async (array) => {
      try {
        await Spotify_API.addTracksToPlaylist(SelectedPlaylist.id, array);
        fetchPlaylistTracks();
      } catch (err) {
        console.error(err);
      }
    });

    alert.success('Success! Songs saved to Spotify Playlist');

    //Duplicated code from SelectedPlaylist Component
    const fetchPlaylistTracks = async () => {
      let PlaylistTracks = [];
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
  };

  const renderSearchButton = () => {
    if (Spotify_API != null && Object.keys(SongList).length !== 0) {
      return (
        <Button
          variant={CompletedSearch ? 'success' : 'primary'}
          size='lg'
          onClick={() => SpotifySearch()}
        >
          Search Spotify for Songs
        </Button>
      );
    }
  };

  const renderSaveSongsButton = () => {
    //logged in to render anything
    if (Spotify_API != null) {
      if (Object.keys(SelectedPlaylist).length !== 0 && CompletedSearch) {
        return (
          <Button onClick={() => saveSongs()} size='lg'>
            Save Songs to Playlist
          </Button>
        );
      }
    }
  };

  return (
    <Container>
      <Row>{renderSearchButton()}</Row>
      <Row>{renderSaveSongsButton()}</Row>
    </Container>
  );
};

export default Searcher;
