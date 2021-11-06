import React from 'react'; 
import './custom.scss'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home'
import About from './components/pages/About';
import PBSpotifyState from './context/pbspotify/PBSpotifyState'

const App = () => {

  return (
      <PBSpotifyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>  
        </Router>
      </PBSpotifyState>
  );
}

export default App;

