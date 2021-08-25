import React, { useContext, Fragment } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import SelectedPlaylist from './SelectedPlaylist';

function TableDisplay() {
    
    const pbspotifyContext = useContext(PBSpotifyContext)

    // Render PBS song list and broadcast date
    const renderPbsData = () => {

        const renderHeader = () => {
            let headerElement = []
            if (pbspotifyContext.SongList.length){
                headerElement.push("Date")
                headerElement.push("Song Info from PBS")
            }
            return headerElement.map((key, index) => {
                return <th key={index}>{key}</th>
            })
        };

        const renderBody = () => {
            return pbspotifyContext.SongList.map((song)=> {
                return(
                    <tr key={song.id}>
                        <td id="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                        <td>{song.pbs_track} / {song.pbs_artist} </td>
                    </tr>
                )
            })
        };    
        return(
            <Col>
            <Table striped bordered size="sm">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
            </Col>
        )
    };
    // render spotify search results and exclude button
    const renderSpotifyData = () => {
        const renderHeader = () => {
            let headerElement = []
            if(pbspotifyContext.CompletedSearch === true){
                headerElement.push("Spotify Search Results")
                headerElement.push("Include")
            }
    
            return headerElement.map((key, index) => {
                return <th key={index}>{key}</th>
            })
        };
        const renderBody = () => {
            if (pbspotifyContext.SongList.length && pbspotifyContext.CompletedSearch){
                return pbspotifyContext.SongList.map((song) => {
                    if (song.spotify_match_found){
                        return(
                            <tr key={song.id}>
                                <td><div>{song.spotify_track} / {song.spotify_artist}</div></td>
                                <td><button onClick={() => excludeResult(song.id)}>{song.exclude_result ? "Excluded" : "✓"}</button></td>
                            </tr>
                        )
                    }else if (!song.spotify_match_found){
                        return(
                            <tr key={song.id}>
                                <td>No Results Found</td>
                            </tr>
                        )
                    }
                }); 
            };
        };
        return(
            <Col>
            <Table className="spotifyTable" striped bordered size="sm">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
            </Col>
        )
    };
    
    const renderPlaylist = () => {
        //https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
        if (Object.keys(pbspotifyContext.SelectedPlaylist).length !== 0){
            return<SelectedPlaylist />
        }
    };

    const excludeResult = (id) => {
        let tempSongList = pbspotifyContext.SongList;
        tempSongList[id].exclude_result = !tempSongList[id].exclude_result;
        pbspotifyContext.setSongList(tempSongList);
        // console.log(tempSongList[id]);
    };

    if (pbspotifyContext.Loading){
        return(
            <Row>
                <Col className='Centered'>
                    <Spinner className="searchLoading" animation="grow" />
                    <h5>Some Loading Text</h5>
                </Col>
                {renderPlaylist()}
            </Row>
        )
    }else return (
        <Row className='TableDisplay'>
            {/* Render Header */}
            {/* Conditional statemet - Show Selected? - Search Completed? */}
            {/* Create headerElement list */}
            {/* return headerElement.map((key, index) => {
                return <th key={index}>{key}</th>
            } */}

            {/* Render Body */}
            {/* Conditional Statement - Same as above */}

            {/* The issue is, is it possible to have 4x Header Elements Columns, 2x table body element Columns and 2x
                Loading bar elements.  */}
            {/* Like maybe put the 2nd two Columns in a wrapper so display a loading animation. */}



        {/* <Col>
            <Table striped bordered size="sm">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
        </Col> */}


            {/* render pbs showlist & date */}
            {renderPbsData()}
            {/* render spotify results & exclude button */}
            {renderSpotifyData()}
            {/* <Col>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </Table>
            </Col> */}
            {/* leave render playlist as is, already returns a col */}
            {renderPlaylist()}
        </Row>  
    )
}

export default TableDisplay
