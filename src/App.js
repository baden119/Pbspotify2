import React from 'react'; 
import './custom.scss'
import Container from 'react-bootstrap/Container';

import Spotify from './components/Spotify'
import Showselect from './components/ShowSelect';
import Searcher from './components/Searcher'
import TableDisplay from './components/TableDisplay';

import PBSpotifyState from './context/pbspotify/PBSpotifyState'

const App = () => {

  return (
      <PBSpotifyState>
        <Container fluid>
          <Spotify />
          <Showselect />
          <Searcher />
          <TableDisplay />
        </Container>    
      </PBSpotifyState>
  );
}

export default App;

