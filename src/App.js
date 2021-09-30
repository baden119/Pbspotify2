import React from 'react'; 
import './custom.scss'
import Container from 'react-bootstrap/Container';

import Showselect from './components/ShowSelect';
import Spotify from './components/Spotify'
import TableDisplay from './components/TableDisplay';
import Searcher from './components/Searcher'

import PBSpotifyState from './context/pbspotify/PBSpotifyState'

const App = () => {

  return (
      <PBSpotifyState>
        <Container>
          <Spotify />
          <Showselect />
          <Searcher />
          <TableDisplay />
        </Container>    
      </PBSpotifyState>
  );
}

export default App;

