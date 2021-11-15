import React from 'react'
import Container from 'react-bootstrap/Container';

import Spotify from '../Spotify'
import Showselect from '../ShowSelect';
import Searcher from '../Searcher'
import TableDisplay from '../TableDisplay';

const Home = () => (
    <Container fluid>
        <Spotify />
        <Showselect />
        <Searcher />
        <TableDisplay />
    </Container>  
);

export default Home
