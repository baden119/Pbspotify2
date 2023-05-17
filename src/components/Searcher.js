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
    Spotify_API,
    SelectedPlaylist,
    setSongList,
    setPlaylistTracks,
    setCompletedSearch,
  } = useContext(PBSpotifyContext);

  const delayTime = 75;
  const alert = useAlert();

  const SpotifySearch = () => {
    const delay = (ms = delayTime) => new Promise((r) => setTimeout(r, ms));

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

    const createRequestPromise = (pbs_track, pbs_artist, id) => {
      return new Promise(function (resolve, reject) {
        Spotify_API.searchTracks(pbs_track + ' ' + pbs_artist, {
          limit: 1,
        }).then(function (res) {
          if (res.tracks.items[0]) {
            resolve(res.tracks.items[0]);
          } else {
            console.log('No Results Found', id);
            resolve(false);
          }
        });
      });
    };

    // Updates a song object with data returned from the Spotify API
    const updateSongWithResults = (song, response) => {
      song.spotify_track = response.name;
      song.spotify_artist = response.artists[0].name;
      song.spotify_URI = response.uri;
      song.exclude_result = false;
      return song;
    };

    const getInSeries = async (songListWithPromises) => {
      let advancedSearchNeeded = [];
      for (let song of songListWithPromises) {
        await delay().then(
          song.promise.then(function (result) {
            if (result) {
              song = updateSongWithResults(song, result);
              const songListCopy = [...SongList];
              songListCopy[song.id] = song;
              setSongList(songListCopy);
            } else {
              song.response = false;
              console.log('Song Not Found', song.id);
              advancedSearchNeeded.push(song);
            }
          })
        );
      }
      return advancedSearchNeeded;
    };

    async function searchAndSetSongData() {
      setLoading(true);
      setCompletedSearch(false);
      const songListCopy = [...SongList];

      const songListWithPromises = songListCopy.map((song) => {
        song.promise = createRequestPromise(
          song.pbs_track,
          song.pbs_artist,
          song.id
        );
        return song;
      });
      const advancedSearchNeeded = await getInSeries(songListWithPromises);

      const advancedListWithPromises = advancedSearchNeeded.map((song) => {
        song.promise = createRequestPromise(
          stripString(song.pbs_track),
          stripString(song.pbs_artist),
          song.id
        );
        return song;
      });

      await getInSeries(advancedListWithPromises);
      alert.info('Search Complete.');
      setCompletedSearch(true);
      setLoading(false);
    }
    searchAndSetSongData();
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
