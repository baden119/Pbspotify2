import React, { useEffect, useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useAsync } from 'react-use';
import { useThrottleRequests } from '../hooks/useThrottleRequests';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import Song from './Song';
import { HardCodedShowList } from './ShowList';

//  Shows using ThrottleRequests Hook
// (https://blog.logrocket.com/throttling-data-requests-with-react-hooks/)
const useThrottleShowRetrieval = (showList) => {
  const { throttle, updateThrottle } = useThrottleRequests();
  const [progressMessage, setProgressMessage] = useState('');

  const currentDate = new Date();
  const recentShowDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 1)
  );

  useAsync(async () => {
    if (!showList) return;

    setProgressMessage('loading show episodes');

    const requestsToMake = showList.map((show, index) => async () => {
      try {
        if (show.url !== 'https://airnet.org.au/rest/stations/3pbs/programs/') {
          const res = await axios.get(`${show.url}/episodes`);
          setProgressMessage(`filtering ${index} / ${showList.length}...`);
          const latestdate = res.data[0].start;
          const convertedDate = new Date(latestdate);
          if (convertedDate > recentShowDate) {
            updateThrottle.requestSucceededWithData(show);
          }
        }
      } catch (error) {
        updateThrottle.requestFailedWithError(error);
      }
    });

    await updateThrottle.queueRequests(requestsToMake);
    setProgressMessage('');
  }, [showList, updateThrottle]);
  return { throttle, progressMessage };
};

const Showselect = () => {
  const pbspotifyContext = useContext(PBSpotifyContext);

  // Set number of episodes to fetch
  const episodeCount = 3;

  const [selectedShow, setSelectedShow] = useState(
    JSON.parse(localStorage.getItem('localShowStorage')) || {}
  );
  const [rawShowList, setRawShowList] = useState([]);
  const [filteredShowList, setFilteredList] = useState([]);
  const { progressMessage, throttle } = useThrottleShowRetrieval(rawShowList);

  // Much of this code is no longer needed with the HardCodedShowList data being kept on file, but is kept here as its a good working example of the useThrottle hook, to be cleaned up later.

  useEffect(() => {
    getRawShowList();
    console.log('Hard Coded Data', HardCodedShowList);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   setFilteredList(throttle.values);
  // }, [throttle]);

  useEffect(() => {
    getSongList();
    pbspotifyContext.setSongList([]);
    localStorage.setItem('localShowStorage', JSON.stringify(selectedShow));
    // eslint-disable-next-line
  }, [selectedShow]);

  // Get a raw list of Pbs Shows from the API, called by useEffect on render.
  const getRawShowList = async () => {
    // let ShowList = [{ id: 0, name: 'Select a PBS Show', url: null }];
    let ShowList = [];
    try {
      const res = await axios.get(
        'https://airnet.org.au/rest/stations/3pbs/programs'
      );
      res.data.forEach((program, index) => {
        ShowList = [
          ...ShowList,
          {
            id: index,
            name: program.name,
            url: program.programRestUrl,
            description: program.gridDescription,
          },
        ];
      });
    } catch (e) {
      console.error('PBS Show List Query', e);
    }

    // normal sort wasnt working for some reason.
    // code from:
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    ShowList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    // Setting the Raw Showlist will trigger useThrottleShowRetrieval function, returning a filtered show list.
    setRawShowList(ShowList);
  };

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
              const song = Song(
                idcount,
                item.track,
                item.artist,
                episode.start
              );
              idcount += 1;
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
    // if (progressMessage !== '') {
    //   return <span>{progressMessage}</span>;
    // } else {
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
