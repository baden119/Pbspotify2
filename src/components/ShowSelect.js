import React, { useEffect, useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import Song from './Song';
import { HardCodedShowList } from './ShowList';

const Showselect = () => {
  const pbspotifyContext = useContext(PBSpotifyContext);

  // Set number of episodes to fetch
  const episodeCount = 3;

  const [selectedShow, setSelectedShow] = useState(
    JSON.parse(localStorage.getItem('localShowStorage')) || {}
  );

  useEffect(() => {
    getSongList();
    pbspotifyContext.setSongList([]);
    localStorage.setItem('localShowStorage', JSON.stringify(selectedShow));
    // eslint-disable-next-line
  }, [selectedShow]);

  // Get Song list for selected show, called by useEffect on show selection.
  // Structure of async functions taken from
  // https://www.taniarascia.com/promise-all-with-async-await/
  const getSongList = () => {
    const getEpisodeList = async () => {
      if (selectedShow.url != null) {
        let episodeList = [];
        //Loop through all episodes episodes of selected show
        try {
          let res = await axios.get(
            `${selectedShow.url}/episodes?numAfter=${episodeCount}&numBefore=${episodeCount}`
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

    const getEpisodeData = async (episode) => {
      try {
        let response = await axios.get(`${episode.episodeRestUrl}/playlists`);
        return response.data;
      } catch (e) {
        console.error('Episode Data Query', e);
      }
    };

    // 27/04/23 i think idcount here could be replaced with an index parameter in the map function.
    const runAsyncFunctions = async () => {
      if (selectedShow.url != null) {
        const episodes = await getEpisodeList();
        const songList = await Promise.all(
          episodes.map(async (episode) => {
            const songList = [];
            const episodedata = await getEpisodeData(episode);
            episodedata.forEach((item, index) => {
              const song = Song(index, item.track, item.artist, episode.start);
              songList.push(song);
            });
            return songList;
          })
        );
        // flat() concaternates the seperate episode arrays down into a single array.
        pbspotifyContext.setSongList(songList.flat());
        pbspotifyContext.setCompletedSearch(false);
      }
    };

    runAsyncFunctions();
  };

  // Handler for Show Selection dropdown.
  const showSelectionHandler = (e) => {
    HardCodedShowList.forEach((show) => {
      if (String(show.id) === e.target.value) {
        // Save show info state
        setSelectedShow(show);
      }
    });
  };

  // Function to render Show Select Menu or Loading message depending on load status.
  const renderShowSelect = () => {
    return (
      <Form.Select
        size='lg'
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
    );
    // }
  };

  return (
    <Row>
      <Col>{renderShowSelect()}</Col>
    </Row>
  );
};

export default Showselect;
