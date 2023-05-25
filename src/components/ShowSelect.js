import React, { useEffect, useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { HardCodedShowList } from './ShowList';

const Showselect = () => {
  const { setSongList } = useContext(PBSpotifyContext);

  // Set number of episodes to fetch
  const episodeCount = 3;

  const [selectedShow, setSelectedShow] = useState(
    JSON.parse(localStorage.getItem('localShowStorage')) || {}
  );

  useEffect(() => {
    getSongList();
    setSongList([]);
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

    const runAsyncFunctions = async () => {
      if (selectedShow.url != null) {
        let idcount = 0;
        const episodes = await getEpisodeList();
        const songList = await Promise.all(
          episodes.map(async (episode) => {
            const songList = [];
            const episodedata = await getEpisodeData(episode);
            episodedata.forEach((item) => {
              const song = {
                id: idcount,
                pbs_track: item.track,
                pbs_artist: item.artist,
                pbs_date: episode.start,
              };
              idcount += 1;
              songList.push(song);
            });
            return songList;
          })
        );

        // For Testing (Force unfindable track into search)

        // let newSongList = songList.flat().slice(0, 10);
        // newSongList.push({
        //   id: 11,
        //   pbs_track:
        //     'ikjshdkjashdkajsd ajhsgdkajsghdkjashd ashdiausgdiaugsdkjasd',
        //   pbs_artist: 'oisuadoiansdi aosiduhuaiosdgoai aosudghioausdgo',
        //   pbs_date: new Date(),
        // });
        // setSongList(newSongList);

        // flat() concaternates the seperate episode arrays down into a single array.
        setSongList(songList.flat());
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
    <Container>
      <Row>
        <Col>{renderShowSelect()}</Col>
      </Row>
    </Container>
  );
};

export default Showselect;
