import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { useAlert } from 'react-alert';

const Searcher = () => {
  const {
    CompletedSearch,
    PlaylistName,
    SongList,
    setLoading,
    Spotify_API,
    setResultCount,
    setSongList,
    setCompletedSearch,
    setSearchSwitch,
    SearchSwitch,
  } = useContext(PBSpotifyContext);

  const delayTime = 125;
  const alert = useAlert();

  const SpotifySearch = () => {
    // Modifys track and artist string data recieved from the PBS API, helps Spotify API search accuracy.
    const modifyInputString = (inputString) => {
      if (inputString) {
        inputString = inputString.split('[')[0];
        inputString = inputString.split('-')[0];
        inputString = inputString.split('(')[0];
        inputString = inputString.split('ft.')[0];
        inputString = inputString.split('feat.')[0];
        inputString = inputString.split('feat')[0];
        inputString = inputString.split('FT')[0];
        inputString = inputString.split('Ft.')[0];
        inputString = inputString.replace(/[^a-zA-Z\s,&]/g, '');
        return inputString;
      } else return;
    };

    // Updates a song object with data returned from the Spotify API
    const updateSongWithResults = (song, response) => {
      song.spotify_track = response.name;
      song.spotify_artist = response.artists[0].name;
      song.spotify_URI = response.uri;
      song.exclude_result = false;
      return song;
    };

    // Creates a percentage count of completed search requests which is used by the loading spinner (in TableDisplay component)
    const updateCompletedCount = (responseCount) => {
      const newCount = Math.round((responseCount / SongList.length) * 100);
      setResultCount(newCount);
    };

    // Takes an array of songs and searches Spotify API for each song, has a delay between each API request to avoid 429 errors
    async function throttledSearch(songs) {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let songListWithResponses = [];
      for (let i = 0; i < songs.length; i++) {
        Spotify_API.searchTracks(
          `track:${modifyInputString(
            songs[i].pbs_track
          )} artist:${modifyInputString(songs[i].pbs_artist)}`,
          {
            limit: 1,
            type: 'track',
          }
        ).then(function (response) {
          if (response.tracks.items[0]) {
            songs[i] = updateSongWithResults(
              songs[i],
              response.tracks.items[0]
            );
            songListWithResponses.push(songs[i]);
            updateCompletedCount(songListWithResponses.length);
          } else {
            songs[i].response = false;
            songListWithResponses.push(songs[i]);
            updateCompletedCount(songListWithResponses.length);
          }
        });
        await delay(delayTime);
      }
      return songListWithResponses;
    }

    // Search routine, alters state values and passes a copy of SongList data into the throttledSearch function. Upon return updates context API with updated SongList.
    setLoading(true);
    setCompletedSearch(false);
    let songListCopy = JSON.parse(JSON.stringify(SongList));
    throttledSearch(songListCopy).then(function (result) {
      setSongList(result);
      alert.info('Search Complete.');
      setCompletedSearch(true);
      setLoading(false);
      setResultCount(0);
    });
  };

  const saveSongs = () => {
    console.log('save songs button pushed', PlaylistName);
    setSearchSwitch(!SearchSwitch);
    // From Playlist MAker component

    // try {
    //   const res = await Spotify_API.createPlaylist(Spotify_ID.id, {
    //     name: playlistText,
    //     public: true,
    //     description: 'Created by PBSpotify.',
    //   });
    //   console.log(res);
    //   alert.success(res.name + ' Playlist Created!');
    //   setPlaylistText('');
    //   setCustomName(true);
    // } catch (err) {
    //   alert.error('Error: Playlist needs a name');
    //   console.error(err);
    // }

    // let URI_array = [];

    // // Spotify has a limit on how many songs can be added to a playlist with one request.
    // const API_limit = 99;

    // SongList.forEach((song) => {
    //   if (song.spotify_URI && !song.exclude_result) {
    //     URI_array = [...URI_array, song.spotify_URI];
    //   }
    // });

    // let adjusted_arrays = URI_array.reduce((adjusted, item, index) => {
    //   const limit_index = Math.floor(index / API_limit);

    //   if (!adjusted[limit_index]) {
    //     adjusted[limit_index] = []; //Start a new limited array
    //   }

    //   adjusted[limit_index].push(item);
    //   return adjusted;
    // }, []);

    // adjusted_arrays.map(async (array) => {
    //   try {
    //     await Spotify_API.addTracksToPlaylist(SelectedPlaylist.id, array);
    //     fetchPlaylistTracks();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });

    // alert.success('Success! Songs saved to Spotify Playlist');

    // //Duplicated code from SelectedPlaylist Component
    // const fetchPlaylistTracks = async () => {
    //   let PlaylistTracks = [];
    //   try {
    //     const res = await Spotify_API.getPlaylistTracks(SelectedPlaylist.id);
    //     res.items.forEach((item, index) => {
    //       PlaylistTracks.push({
    //         id: index,
    //         track: item.track.name,
    //         artist: item.track.artists[0].name,
    //       });
    //     });
    //     setPlaylistTracks(PlaylistTracks);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
  };

  const renderSearchButton = () => {
    if (
      Spotify_API != null &&
      Object.keys(SongList).length !== 0 &&
      !CompletedSearch
    ) {
      return (
        <Button size='lg' onClick={() => SpotifySearch()}>
          Search Spotify for Songs
        </Button>
      );
    }
  };

  const renderSaveSongsButton = () => {
    //logged in to render anything
    // if (Spotify_API != null) {
    //   if (CompletedSearch) {
    return (
      <Button onClick={() => saveSongs()} size='lg'>
        Save Songs to Playlist
      </Button>
    );
    //   }
    // }
  };

  return (
    <Container>
      <Row>{renderSearchButton()}</Row>
      <Row>{renderSaveSongsButton()}</Row>
    </Container>
  );
};

export default Searcher;
