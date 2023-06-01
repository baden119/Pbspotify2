import React, { useState, useContext, useEffect } from 'react';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAlert } from 'react-alert';

const PlaylistMaker = () => {
  const {
    Spotify_API,
    Spotify_ID,
    SelectedShowName,
    // PlaylistName,
    setPlaylistName,
    // setSelectedShowName,
    SearchSwitch,
  } = useContext(PBSpotifyContext);

  const [playlistText, setPlaylistText] = useState('');
  const [customName, setCustomName] = useState(false);
  const [synched, setSynched] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    'Seach Thing Pushed';
  }, [SearchSwitch]);

  const onNameChange = (e) => {
    setCustomName(true);
    setPlaylistText(e.target.value);
  };

  const GenerateName = () => {
    const CreateDate = () => {
      return new Intl.DateTimeFormat('en-AU', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
      }).format();
    };

    if (SelectedShowName) {
      return SelectedShowName + ' | ' + CreateDate();
    }
  };

  const autoGenerateName = () => {
    setCustomName(false);
    setPlaylistText(GenerateName());
  };

  const renderAutoGenerateNameButton = () => {
    if (customName)
      return <Button onClick={autoGenerateName}>Auto Generate Name</Button>;
  };

  if (!customName) {
    if (playlistText !== GenerateName()) {
      setPlaylistText(GenerateName());
      console.log('Playlist Name Out Of sync');
    }
  }
  // const onCreateClick = async () => {
  //   try {
  //     const res = await Spotify_API.createPlaylist(Spotify_ID.id, {
  //       name: playlistText,
  //       public: true,
  //       description: 'Created by PBSpotify.',
  //     });
  //     console.log(res);
  //     alert.success(res.name + ' Playlist Created!');
  //     setPlaylistText('');
  //     setCustomName(true);
  //   } catch (err) {
  //     alert.error('Error: Playlist needs a name');
  //     console.error(err);
  //   }
  // };

  return (
    <Form className='p-1 m-1 border border-danger'>
      <Form.Group>
        <Form.Label>Playlist Name {renderAutoGenerateNameButton()}</Form.Label>
        <Form.Control
          type='text'
          placeholder='New Playlist Name'
          size='lg'
          className='textInput'
          name='playlistName'
          value={playlistText}
          onChange={onNameChange}
        />
      </Form.Group>
    </Form>
  );
};

export default PlaylistMaker;
