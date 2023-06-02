import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

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
          <th>Searching...</th>
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
                  <Progress
                    strokeWidth={5}
                    width={200}
                    type='circle'
                    percent={ResultCount}
                  />
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
  const { SongList } = useContext(PBSpotifyContext);

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
                  {song.pbs_track} / {song.pbs_artist}
                </td>

                <td className='PositiveResult'>
                  {song.spotify_track} / {song.spotify_artist}
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
  const { CompletedSearch, Loading, SongList } = useContext(PBSpotifyContext);

  const renderDescription = () => {
    if (Object.keys(SongList).length !== 0) {
      return (
        <span className='ShowDescription'>
          {SongList[0].pbs_showDescription}
        </span>
      );
    }
  };

  const renderTable = () => {
    if (SongList.length && !Loading && !CompletedSearch) {
      return <BeforeSearch />;
    } else if (SongList.length && Loading && !CompletedSearch) {
      return <DuringSearch SongList={SongList} />;
    } else return <AfterSearch SongList={SongList} />;
  };

  return (
    <div>
      <Row>{renderDescription()}</Row>
      <Row className='TableDisplay'>
        <Col>{renderTable()}</Col>
      </Row>
    </div>
  );
}

export default TableDisplay;
