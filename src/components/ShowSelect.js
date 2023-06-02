import React, { useEffect, useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { HardCodedShowList } from './ShowList';

const Showselect = () => {
  const { setSongList, setCompletedSearch, setCompletedProcess } =
    useContext(PBSpotifyContext);

  const [selectedShow, setSelectedShow] = useState(
    JSON.parse(localStorage.getItem('localShowStorage')) || {}
  );

  useEffect(() => {
    setSongList([]);
    getSongList();
    setCompletedSearch(false);
    setCompletedProcess(false);
    localStorage.setItem('localShowStorage', JSON.stringify(selectedShow));
    // eslint-disable-next-line
  }, [selectedShow]);

  // Get Song list for selected show, called by useEffect on show selection.
  const getSongList = () => {
    // Fetches data about 10 most recent episodes of selected show from PBS API
    const getEpisodeList = async () => {
      if (selectedShow.url != null) {
        let episodeList = [];
        try {
          let res = await axios.get(
            `${selectedShow.url}/episodes?numAfter=10&numBefore=10`
          );
          res.data.forEach((episode) => {
            episodeList = [...episodeList, episode];
          });
          // Sort episodes by date (newest first)
          episodeList.sort(function (a, b) {
            return new Date(b.start) - new Date(a.start);
          });
          return episodeList;
        } catch (e) {
          console.error('Episode List Query', e);
        }
      }
    };

    // Fetches a track-list for a single episode of a PBS Show. Returns track-list and broadcast date.
    const getEpisodeData = async (episode) => {
      try {
        let response = await axios.get(`${episode.episodeRestUrl}/playlists`);
        return {
          pbs_tracks: response.data,
          pbs_date: episode.start,
        };
      } catch (e) {
        console.error('Episode Data Query', e);
      }
    };

    // Filters out episodes that contain no track-list data. Ensures spotify playlist of decent length.
    const filterEpisodes = (episodeArray) => {
      let filteredCount = 0;
      let selectedArray = [];

      episodeArray.forEach((episode) => {
        if (filteredCount < episodeCount) {
          if (episode.pbs_tracks.length > 1) {
            filteredCount += 1;
          }
          selectedArray.push(episode);
        }
      });
      return selectedArray;
    };

    // Set number of episodes to use for spotify playlist
    const episodeCount = 4;

    // Runs getEpisodeList, getEpisodeData and filterEpisode functions to gather data from the PBS API. Creates a song object for each PBS track with track, artist and broadcast date info. Sets an array of these objects to the Context API
    const getAndSetPbsData = async () => {
      if (selectedShow.url != null) {
        let idcount = 0;
        const episodes = await getEpisodeList();
        const allEpisodes = await Promise.all(
          episodes.map(async (episode) => await getEpisodeData(episode))
        );
        const filteredEpisodes = filterEpisodes(allEpisodes);

        const songListArray = filteredEpisodes.map((episode, index) => {
          const song = episode.pbs_tracks.map((item) => {
            const song = {
              id: idcount,
              pbs_track: item.track,
              pbs_artist: item.artist,
              pbs_date: episode.pbs_date,
            };
            if (idcount === 0) {
              song.pbs_showName = selectedShow.name;
              song.pbs_showDescription = selectedShow.description;
            }

            idcount += 1;
            return song;
          });
          return song;
        });

        setSongList(songListArray.flat());
      }
    };

    getAndSetPbsData();
  };

  // Handler for Show Selection dropdown.
  const showSelectionHandler = (e) => {
    setSelectedShow(
      HardCodedShowList.find((show) => String(show.id) === e.target.value)
    );
  };

  // Function to render Show Select Menu or Loading message depending on load status.
  const renderShowSelect = () => {
    return (
      <InputGroup className='mb-2' size='lg'>
        {/* TODO Implement Breakpoint to not display this on mobile */}
        {/* <InputGroup.Text className='plain'>
          PBS Show:
        </InputGroup.Text> */}
        <Form.Select
          name='selected show'
          id='show_select_dropdown'
          placeholder='Select a PBS Show'
          value={selectedShow.id}
          onChange={(e) => showSelectionHandler(e)}
        >
          <option>Select a PBS Show</option>
          {HardCodedShowList.map((show) => {
            return (
              <option key={show.id} value={show.id}>
                {show.name}
              </option>
            );
          })}
          ;
        </Form.Select>
      </InputGroup>
    );
    // }
  };

  return (
    <Container>
      <Row>{renderShowSelect()}</Row>
    </Container>
  );
};

export default Showselect;
