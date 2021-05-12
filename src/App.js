import React from 'react'; 
import './App.css';
import EpisodesDisplay from './components/pbs/EpisodesDisplay';
import Showselect from './components/pbs/ShowSelect';
import Spotify from './components/spotify/Spotify'

import PbsState from './context/pbs/PbsState';

const App = () => {



  return (
    <PbsState>
      <div className="App">
        <Spotify />
        <Showselect />
        <EpisodesDisplay />
      </div>    
    </PbsState>
  );
}

export default App;

