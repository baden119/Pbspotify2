import React, { useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import PBSpotifyContext from '../context/pbspotify/pbspotifyContext';
import SelectedPlaylist from './SelectedPlaylist';

function TableDisplay() {
    
    const pbspotifyContext = useContext(PBSpotifyContext)

    // Render Header Elements for Table Display
    const renderHeader = () => {
        let headerElement = []
        if (pbspotifyContext.SongList.length){
            headerElement.push("Date")
            headerElement.push("Song Info from PBS")
        }
        if(pbspotifyContext.CompletedSearch || pbspotifyContext.Loading){
            headerElement.push("Spotify Search Results")
            headerElement.push("Include")
        }

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    };

    // Render Table DIsplay Body (Includes Loading Spinner)
    const renderBody = () => {

        if (pbspotifyContext.SongList.length && !pbspotifyContext.Loading && !pbspotifyContext.CompletedSearch){
            return pbspotifyContext.SongList.map((song)=> {
                return(
                    <tr key={song.id}>
                        <td className="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                        <td>{song.pbs_track} / {song.pbs_artist} </td>
                    </tr>
                )
            })
        } else if (pbspotifyContext.SongList.length && pbspotifyContext.Loading){
            return pbspotifyContext.SongList.map((song, index)=> {
                if (index === 0){
                    return (
                        <tr key={song.id}>
                            <td className="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                            <td>{song.pbs_track} / {song.pbs_artist} </td>
                            <td colSpan="2" rowSpan="0" className="bigSpan Centered">
                                    <h5>Searching...</h5>
                                    <div id="loadingContainer"> 
                                        <Spinner id="searchLoading" animation="grow" />
                                    </div>
                                    <h6>Results Returned</h6>
                                    <h3>{pbspotifyContext.ResultCount} / {pbspotifyContext.SongList.length}</h3>

                            </td>
                        </tr>
                    )              
                } else {
                    return (
                    <tr key={song.id}>
                        <td className="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                        <td>{song.pbs_track} / {song.pbs_artist} </td>
                    </tr>
                    )
                }
            })
        } else if (pbspotifyContext.SongList.length && pbspotifyContext.CompletedSearch){
            return pbspotifyContext.SongList.map((song) => {
                if (song.spotify_match_found){
                    return(
                        <tr key={song.id}>
                            <td className="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                            <td>{song.pbs_track} / {song.pbs_artist} </td>
                            <td><div>{song.spotify_track} / {song.spotify_artist}</div></td>
                            <td><button onClick={() => excludeResult(song.id)}>{song.exclude_result ? "Excluded" : "✓"}</button></td>
                        </tr>
                    )
                }else if (!song.spotify_match_found){
                    return(
                        <tr key={song.id}>
                            <td className="dateColumn">{new Intl.DateTimeFormat('en-AU', {day: 'numeric', month:'numeric', year: '2-digit'}).format(new Date(song.pbs_date))}</td>
                            <td>{song.pbs_track} / {song.pbs_artist} </td>
                            <td>No Results Found</td>
                        </tr>
                    )
                }
            }); 
        };
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
    };

     return (
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
