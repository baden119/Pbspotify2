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

     // https://dev.to/abdulbasit313/learn-how-to-create-react-js-table-with-hooks-that-has-delete-functionality-too-2jjb
    const renderHeader = () => {
        let headerElement = []
        if (pbspotifyContext.SongList.length){
            headerElement.push("Date")
            headerElement.push("Song Info from PBS")
        }
            if(pbspotifyContext.CompletedSearch === true){
                headerElement.push("Spotify Search Results")
                headerElement.push("Include")
            }

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {


        //if songlist but no search results
        if (pbspotifyContext.SongList.length && !pbspotifyContext.CompletedSearch){
            return pbspotifyContext.SongList.map((song)=> {
                return(
                    <tr key={song.id}>
                        <td id="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                        <td>{song.pbs_track} / {song.pbs_artist} </td>
                    </tr>
                )
            })

        // if SongList and SearchResults
        } else if (pbspotifyContext.SongList.length && pbspotifyContext.CompletedSearch){
            return pbspotifyContext.SongList.map((song) => {
                if (song.spotify_match_found){
                    return(
                            <tr key={song.id}>
                                <td id="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                                <td>{song.pbs_track} / {song.pbs_artist}</td>
                                <td>{song.spotify_track} / {song.spotify_artist}</td>
                                <td><button onClick={() => excludeResult(song.id)}>{song.exclude_result ? "Excluded" : "✓"}</button></td>
                            </tr>
                        )
                }else if (!song.spotify_match_found){
                    return(
                        <tr key={song.id}>
                            <td id="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                            <td>{song.pbs_track} {song.pbs_artist}</td>
                            <td>No Results Found</td>
                        </tr>
                    )
                }
            }); 
        };

    }
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
            {renderPlaylist()}
        </Row>  
    )
}

export default TableDisplay
