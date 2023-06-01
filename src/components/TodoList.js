import React, { useContext } from 'react';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';

function TodoList() {
  const { Spotify_ID, SongList, CompletedSearch } =
    useContext(PBSpotifyContext);

  return (
    <div>
      Todo List
      <ul>
        <li
          style={{ textDecorationLine: Spotify_ID ? 'line-through' : 'none' }}
        >
          Login to Spotify
        </li>
        <li
          style={{
            textDecorationLine: SongList.length !== 0 ? 'line-through' : 'none',
          }}
        >
          Choose a PBS Show
        </li>
        <li
          style={{
            textDecorationLine: CompletedSearch ? 'line-through' : 'none',
          }}
        >
          Search Spotify for SongDogs
        </li>
      </ul>
    </div>
  );
}

export default TodoList;
