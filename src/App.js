import React from 'react'; 
import './App.css';
import EpisodeDisplay from './components/pbs/EpisodeDisplay';
import Showselect from './components/pbs/ShowSelect';

import PbsState from './context/pbs/PbsState';

const App = () => {

  return (
    <PbsState>
      <div className="App">
        <Showselect/>
        <EpisodeDisplay />
      </div>    
    </PbsState>
  );
}

export default App;
