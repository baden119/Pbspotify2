import React from 'react'; 
import './App.css';
import EpisodesDisplay from './components/pbs/EpisodesDisplay';
import Showselect from './components/pbs/ShowSelect';
import Spotify from './components/spotify/Spotify'
import SonglistComparison from './components/spotify/SonglistComparison';

import PbsState from './context/pbs/PbsState';
import SpotifyState from './context/spotify/SpotifyState'

const App = () => {

  return (
    <PbsState>
      <SpotifyState>
        <div style={indexPage}>
          <div style={loginPage}><Spotify /></div>
          <div style={showSelectPage}><Showselect /></div>
          <div style={songlistComparisonPage}><SonglistComparison /></div>
          {/* <EpisodesDisplay /> */}
        </div>    
      </SpotifyState>
    </PbsState>
  );
}


const indexPage = {
    display: 'grid',
    // gridTemplateColumns:'repeat(2, 1fr)',
    gridTemplateRows:'repeat(3, 1fr)',
    gridGap: '5px',
    // gridTemplateAreas: `'loginPage loginPage loginPage',
    //   'showSelectPage showSelectPage showSelectPage'`
  };

const loginPage={
  backgroundColor:'blue'
};

const showSelectPage = {
  backgroundColor:'green'
};

const songlistComparisonPage = {
  backgroundColor:'aqua'
};
    // .header {
  //   grid-area: header;
  //   background-color: aqua;
  // }
  // .Login {
  //   height: 100px;
  //   width: 100%;
  //   margin: auto;
  //   justify-content: center;
  //   align-items: center;
  //   text-align: center;
  //   display: grid;
  //   grid-template-columns: 0.5fr 1.5fr;
  //   grid-template-rows: 1fr;
  //   gap: 0px 0px;
  //   grid-template-areas: 'Login-Button Playlist-Creator';
  //   grid-area: Login;
  //   background-color: lightpink;
  // }
  // .Login-Button {
  //   grid-area: Login-Button;
  // }
  // .Playlist-Creator {
  //   background-color: blueviolet;
  //   grid-area: Playlist-Creator;
  // }

  // .wrapper {
  //   display: grid;
  //   grid-template-columns: 100px 100px;
  //   /* grid-template-areas: "header header"
  //                           "aside main"
  //                           "footer footer"; */
  // }
  
  // .header {
  //   grid-area: header;
  //   background-color: aqua;
  // }
  
  // .main {
  //   grid-area: main;
  //   background-color: lightgreen;
  // }
  
  // .aside {
  //   grid-area: aside;
  //   background-color: yellow;
  // }
  
  // .footer {
  //   grid-area: footer;
  //   background-color: pink;
  // }



  
export default App;

