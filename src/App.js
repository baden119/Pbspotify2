import React from 'react'; 
import './App.css';
import Showselect from './components/pbs/Showselect';

import PbsState from './context/pbs/PbsState';

const App = () => {

  return (
    <PbsState>
      <div className="App">
        <Showselect/>
      </div>  
    </PbsState>
  );
}

export default App;
