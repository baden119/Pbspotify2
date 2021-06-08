import React from 'react'; 
import './App.css';
import Showselect from './components/pbs/ShowSelect';
import Spotify from './components/spotify/Spotify'
import SonglistComparison from './components/spotify/SonglistComparison';
import Searcher from './components/spotify/Searcher'

import PbsState from './context/pbs/PbsState';
import SpotifyState from './context/spotify/SpotifyState'

const App = () => {

  return (
    <PbsState>
      <SpotifyState>
        <div style={indexPage}>
          <div style={loginPage}><Spotify /></div>
          <div style={showSelectPage}><Showselect /></div>
          <div style={searcherPage}><Searcher /></div>
          <div style={songlistComparisonPage}><SonglistComparison /></div>
        </div>    
      </SpotifyState>
    </PbsState>
  );
}


const indexPage = {
    display: 'grid',
    gridTemplateRows:'repeat(4)',
    // gridGap: '5px',
  };

const loginPage={
  backgroundColor:'blue'
};

const showSelectPage = {
  backgroundColor:'green'
};

const searcherPage = {
  backgroundColor:'greenyellow'
}

const songlistComparisonPage = {
  backgroundColor:'aqua'
};

  
export default App;

