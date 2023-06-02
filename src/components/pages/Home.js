import React from 'react';
import Container from 'react-bootstrap/Container';

import Spotify from '../Spotify';
import Showselect from '../ShowSelect';
import SearchOrDonate from '../SearchOrDonate';
import TableDisplay from '../TableDisplay';

const Home = () => (
  <Container fluid>
    <Spotify />
    <Showselect />
    <SearchOrDonate />
    <TableDisplay />
  </Container>
);

export default Home;
