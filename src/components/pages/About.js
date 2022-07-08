import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import { apiURL } from '../config';

const About = () => {
  // const [tracksUseage, setTracksUseage] = useState('');
  // const [playListsUseage, setPlayListsUseage] = useState('');

  // useEffect(() => {
  //   const getUseageStats = async () => {
  //     try {
  //       const res = await axios.get(apiURL() + '/api/useage/');
  //       setTracksUseage(res.data[0].tracks_count);
  //       setPlayListsUseage(res.data[0].playlists_count);
  //       console.log(res.data[0]);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   getUseageStats();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <Container>
      <p>
        PBSpotify creates Spotify playlists based on the track lists of shows
        broadcast on PBS 106.7FM, a community radio station in Melbourne,
        Australia.
      </p>
      <p>
        This app was created by Baden Allen as the final project for the CS50
        Web Programming course in 2021.
      </p>
      <p>Initiaiting Test Changes.</p>
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
