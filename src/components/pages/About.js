import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const About = () => {
  return (
    <Container>
      <div className='aboutPageText'>
        <p>
          PBSpotify creates Spotify playlists based on the track lists of shows
          broadcast on PBS 106.7FM, a community radio station in Melbourne,
          Australia.
        </p>
        <p>
          This app was created in React by Baden Allen as a portfolio project
          for entry level programming jobs.
        </p>
      </div>
      <h2 className='text-center'>Links:</h2>

      <Row className='show-grid text-center align-items-center'>
        <Col xs={12} sm={4} className='mb-5'>
          <a
            href='https://github.com/baden119/Pbspotify2'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src='assets/github-mark.png'
              thumbnail
              className='aboutPageImage'
            />
          </a>
          <h3> PBSpotify Github Repo</h3>
        </Col>
        <Col xs={12} sm={4} className='mb-5'>
          <a
            href='www.linkedin.com/in/baden-allen-951099275'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src='assets/LI-Logo.png'
              thumbnail
              className='aboutPageImage'
            />
          </a>
          <h3>Baden's LinkedIn</h3>
        </Col>
        <Col xs={12} sm={4} className='mb-5'>
          <a
            href='https://docs.google.com/document/d/e/2PACX-1vTr_div9rvh3RUpZcgqAPJwlhby9lHERCzsLvaS77sROQDa3Mec-hQUjfNc-5j5Kvk_fMXgeraVKE_B/pub'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src='assets/resume-screenshot.png'
              thumbnail
              className='aboutPageImage'
            />
          </a>
          <h3>Baden's Resume</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
