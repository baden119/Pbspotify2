import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const About = () => {
  return (
    <Container>
      <p>
        PBSpotify creates Spotify playlists based on the track lists of shows
        broadcast on PBS 106.7FM, a community radio station in Melbourne,
        Australia.
      </p>
      <p>
        This app was created by Baden Allen as the final project for the CS50
        Web Programming course.
      </p>
      <p>
        You can support PBS 106.7FM by becomming a member or making a donation.
      </p>
      <Row>
        <Button
          variant='success'
          size='lg'
          href='https://www.pbsfm.org.au/signup'
        >
          Join or Donate to PBS 106.7FM
        </Button>
      </Row>
    </Container>
  );
};

export default About;
