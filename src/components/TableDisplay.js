import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import SelectedPlaylist from './SelectedPlaylist';

const CreateDate = (date) => {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  }).format(new Date(date));
};

const BeforeSearch = () => {
  const { SongList } = useContext(PBSpotifyContext);
  return (
    <Table striped bordered size='sm'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Song Info from PBS</th>
        </tr>
      </thead>
      <tbody>
        {SongList.map((song) => {
          return (
            <tr key={song.id}>
              <td className='dateColumn'>{CreateDate(song.pbs_date)}</td>
              <td>
                {song.pbs_track} / {song.pbs_artist}{' '}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const DuringSearch = () => {
  const { SongList, ResultCount } = useContext(PBSpotifyContext);

  return (
    <Table striped bordered size='sm'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Song Info from PBS</th>
          <th>Spotify Search Results</th>
        </tr>
      </thead>
      <tbody>
        {SongList.map((song, index) => {
          if (index === 0) {
            return (
              <tr key={song.id}>
                <td className='dateColumn'>{CreateDate(song.pbs_date)}</td>
                <td>
                  {song.pbs_track} / {song.pbs_artist}{' '}
                </td>
                <td colSpan='2' rowSpan='0' className='bigSpan Centered'>
                  <h5>Searching...</h5>
                  <div id='loadingContainer'>
                    <Spinner id='searchLoading' animation='grow' />
                  </div>
                  <h6>Results Returned</h6>
                  <h3>
                    {ResultCount} / {SongList.length}
                  </h3>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={song.id}>
                <td className='dateColumn'>{CreateDate(song.pbs_date)}</td>
                <td>
                  {song.pbs_track} / {song.pbs_artist}{' '}
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

const AfterSearch = () => {
  const { SongList, setSongList } = useContext(PBSpotifyContext);

  const excludeResult = (id) => {
    let tempSongList = SongList;
    tempSongList[id].exclude_result = !tempSongList[id].exclude_result;
    setSongList(tempSongList);
  };

  return (
    <Table striped bordered size='sm'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Song Info from PBS</th>
          <th>Spotify Search Results</th>
        </tr>
      </thead>
      <tbody>
        {SongList.map((song) => {
          if (song.spotify_URI) {
            return (
              <tr key={song.id}>
                <td className='dateColumn'>{CreateDate(song.pbs_date)}</td>
                <td>
                  {song.pbs_track} / {song.pbs_artist}{' '}
                </td>

                <td>
                  {song.exclude_result ? (
                    <Button
                      onClick={() => excludeResult(song.id)}
                      className='excludedSong'
                    >
                      {song.spotify_track} / {song.spotify_artist}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => excludeResult(song.id)}
                      className='includedSong'
                    >
                      {song.spotify_track} / {song.spotify_artist}
                    </Button>
                  )}
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={song.id}>
                <td className='dateColumn'>{CreateDate(song.pbs_date)}</td>
                <td>
                  {song.pbs_track} / {song.pbs_artist}{' '}
                </td>
                <td>No Results Found</td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

function TableDisplay() {
  const { CompletedSearch, Loading, SongList, SelectedPlaylist } =
    useContext(PBSpotifyContext);

  const renderTable = () => {
    if (SongList.length && !Loading && !CompletedSearch) {
      return <BeforeSearch />;
    } else if (SongList.length && Loading && !CompletedSearch) {
      return <DuringSearch SongList={SongList} />;
    } else return <AfterSearch SongList={SongList} />;
  };

  const renderPlaylist = () => {
    if (Object.keys(SelectedPlaylist).length !== 0) {
      return <SelectedPlaylist />;
    }
  };

  return (
    <Row className='TableDisplay'>
      <Col>{renderTable()}</Col>
      {renderPlaylist()}
    </Row>
  );
}

export default TableDisplay;
