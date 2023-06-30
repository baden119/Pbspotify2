import React, { Fragment, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import { homeURL } from './config';

function MyNavbar() {
  const {
    setLoading,
    setResultCount,
    setSongList,
    setCompletedSearch,
    setSpotify_API,
    Spotify_ID,
  } = useContext(PBSpotifyContext);

  const Reset = () => {
    console.log('Reset');
    localStorage.clear();
    setSpotify_API(null);
    setSongList([]);
    setCompletedSearch(false);
    setLoading(false);
    setResultCount(0);
    window.location.replace(homeURL());
  };

  const renderUserInfo = () => {
    if (Spotify_ID) {
      return (
        <Fragment>
          <Navbar.Text className='mx-1'>
            Signed in as <b>{Spotify_ID.display_name}</b>
          </Navbar.Text>
          <Navbar.Text className='mx-1'>
            <Button variant='primary' size='sm' onClick={() => Reset()}>
              Logout
            </Button>
          </Navbar.Text>
        </Fragment>
      );
    }
  };

  return (
    <Navbar bg='navbar' data-bs-theme='dark'>
      <Container>
        <Link className='appName' to='/'>
          <span>PBSpotify</span>
        </Link>
        {renderUserInfo()}
        <Nav variant='pills' className='justify-content-end'>
          <Nav.Item>
            <Link
              style={{ color: 'black' }}
              className='justify-content-end text-decoration-none'
              to='/about'
            >
              About
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
