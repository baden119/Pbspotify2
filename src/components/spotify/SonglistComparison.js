import React, { useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SpotifyContext from '../../context/spotify/spotifyContext';
import SelectedPlaylist from './SelectedPlaylist';

function SonglistComparison() {
    
    const pbsContext = useContext(PbsContext); 
    const spotifyContext = useContext(SpotifyContext)

     // https://dev.to/abdulbasit313/learn-how-to-create-react-js-table-with-hooks-that-has-delete-functionality-too-2jjb
    const renderHeader = () => {
        let headerElement = []
        if (pbsContext.SongList.length){
            headerElement.push("Pbs SongList")
        };
        if (spotifyContext.SpotifySearchResults.length){
            headerElement.push("Spotify Search Results")
        }

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {
        if (pbsContext.SongList.length && !spotifyContext.SpotifySearchResults.length){
            return pbsContext.SongList.map((song)=> {
                return(
                    <tr key={song.id}>
                        <td style={{border:'1px solid'}}>{song.track} / {song.artist} <small>{song.date}</small></td>
                    </tr>
                )
            })
        } else if (pbsContext.SongList.length && spotifyContext.SpotifySearchResults.length){
            return spotifyContext.SpotifySearchResults.map((song) => {
                if (song.spotifyResponse){
                    return(
                            <tr key={song.id}>
                                <td style={{border:'1px solid'}}>{song.track} / {song.artist}</td>
                                <td style={{border:'1px solid'}}>{song.spotifyResponse.name} / {song.spotifyResponse.artists[0].name}</td>
                            </tr>
                        )
                }else if (song.spotifyResponse === false){
                    return(
                        <tr key={song.id}>
                            <td style={{border:'1px solid'}}>{song.track} {song.artist}</td>
                            <td style={{border:'1px solid'}}>No Results Found</td>
                        </tr>
                    )
                }
            }); 
        };

    }
    const renderPlaylist = () => {
        //https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
        if (Object.keys(spotifyContext.SelectedPlaylist).length !== 0){
            return<SelectedPlaylist />
        }
    }

    return (
        <div style={songListComparisonStyle}>
             <table style={{width : '100%'}}>
                 <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            {renderPlaylist()}
        </div>
    )
}

const songListComparisonStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    padding: '0',
    // margin: '10px',
    // justifyContent: 'center',
    // alignItems: 'center',
    gridTemplateColumns:'repeat(2, 70% 30%)'

    
} 
export default SonglistComparison
