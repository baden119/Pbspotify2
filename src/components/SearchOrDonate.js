import React, { useContext } from 'react';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Searcher from './Searcher';

const SearchOrDonate = () => {
  const { CompletedProcess } = useContext(PBSpotifyContext);

  if (CompletedProcess) {
    return (
      <Container>
        <Row>
          <div className='completedProcessMessage'>
            <p>
              Your playlist has been saved and is accessable through Spotify.
            </p>
            <p>
              To make more playlists, choose another show from the dropdown.
            </p>
            <p>
              Please consider donating or subscribing to PBS 106.7FM to support
              the hardworking volunteers who produce these wonderful tracklists.
            </p>
          </div>
        </Row>
        <Row>
          <Button
            className='donateButton'
            size='lg'
            href='https://www.pbsfm.org.au/signup'
          >
            Join or Donate to PBS 106.7FM
          </Button>
        </Row>
      </Container>
    );
  } else return <Searcher />;
};

export default SearchOrDonate;
