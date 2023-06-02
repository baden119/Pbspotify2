import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { useAlert } from 'react-alert';

const Searcher = () => {
  const {
    CompletedSearch,
    SongList,
    setLoading,
    Spotify_API,
    Spotify_ID,
    setResultCount,
    setSongList,
    setCompletedSearch,
    setCompletedProcess,
  } = useContext(PBSpotifyContext);

  const [playlistName, setPlaylistName] = useState('');
  const [customName, setCustomName] = useState(false);

  const delayTime = 125;
  const alert = useAlert();

  const SpotifySearch = () => {
    // Modifys track and artist string data recieved from the PBS API, helps Spotify API search accuracy.
    const modifyInputString = (inputString) => {
      if (inputString) {
        inputString = inputString.substring(0, 15);
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
    const createNewPlaylist = async () => {
      try {
        const newPlaylist = await Spotify_API.createPlaylist(Spotify_ID.id, {
          name: playlistName,
          public: true,
          description: 'Created by PBSpotify.',
        });
        return newPlaylist;
      } catch (error) {
        console.error(error);
      }
    };

    const populatePlaylist = async (newPlaylistID) => {
      let URI_array = [];
      // Spotify has a limit on how many songs can be added to a playlist with one request.
      const API_limit = 99;

      SongList.forEach((song) => {
        if (song.spotify_URI && !song.exclude_result) {
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
          Spotify_API.addTracksToPlaylist(newPlaylistID, array);
        } catch (err) {
          console.error(err);
        }
      });
      alert.success('Success! Songs saved to Spotify Playlist');
      setCompletedProcess(true);
    };

    const createAndPopulatePlaylist = async () => {
      const newPlaylist = await createNewPlaylist();
      await populatePlaylist(newPlaylist.id);
    };

    createAndPopulatePlaylist();
  };

  const renderPlaylistNameInput = () => {
    const generatePlaylistName = () => {
      const todaysDate = () => {
        return new Intl.DateTimeFormat('en-AU', {
          month: 'numeric',
          year: '2-digit',
        }).format(new Date());
      };

      return SongList[0].pbs_showName + ' | ' + todaysDate();
    };

    const renderGenerateNameButton = () => {
      if (customName) {
        return (
          <Button onClick={() => setCustomName(false)} variant='background'>
            Generate Name
          </Button>
        );
      }
    };

    if (Object.keys(SongList).length !== 0) {
      if (!customName && playlistName !== generatePlaylistName()) {
        setPlaylistName(generatePlaylistName());
      }
    }

    const onNameChange = (e) => {
      setPlaylistName(e.target.value);
      setCustomName(true);
    };
    if (Spotify_ID) {
      return (
        <InputGroup className='mb-2'>
          {/* TODO Fix this for mobile display */}
          {/* <InputGroup.Text className='plain'></InputGroup.Text> */}
          <Form.Control
            type='text'
            placeholder='New Playlist Name'
            size='lg'
            width='100%'
            id='show_select_dropdown'
            name='playlistName'
            value={playlistName}
            onChange={onNameChange}
          />
          {renderGenerateNameButton()}
        </InputGroup>
      );
    }
  };

  const renderSearchButton = () => {
    if (
      Spotify_API != null &&
      Object.keys(SongList).length !== 0 &&
      !CompletedSearch
    ) {
      return (
        <Button
          variant={CompletedSearch ? 'success' : 'primary'}
          size='lg'
          className='mb-2'
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
      if (CompletedSearch) {
        return (
          <Button
            variant='success'
            onClick={() => saveSongs()}
            size='lg'
            className='mb-2'
          >
            Save Songs to Playlist
          </Button>
        );
      }
    }
  };

  return (
    <Container>
      <Row>{renderPlaylistNameInput()}</Row>
      <Row>{renderSearchButton()}</Row>
      <Row>{renderSaveSongsButton()}</Row>
    </Container>
  );
};

export default Searcher;
