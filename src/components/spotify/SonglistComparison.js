import React, { useEffect, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SearchResult from './SearchResult';

function SonglistComparison() {
    
    const pbsContext = useContext(PbsContext); 

    //Gets a SongList from selected PBS Show
    useEffect(() => {
        pbsContext.setSongList();
    // eslint-disable-next-line
      }, [pbsContext.SelectedShow]);

    return (
        <div style={songListComparisonStyle}>
             <table style={{width : '100%'}}>
                 <thead>
                    <tr>
                        <th style={{border:'1px solid', textAlign:'left'}}>Pbs SongList</th>
                        <th style={{border:'1px solid', textAlign:'left'}}>Spotify Results</th>
                    </tr>
                </thead>
                <tbody>
                    {pbsContext.SongList.map((song) => (
                        <tr key={song.id}>
                            <td style={{border:'1px solid'}}>{song.track} {song.artist}</td>
                            <td style={{border:'1px solid'}}><SearchResult songId={song.id} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                    <h3 style={{margin:'0', textAlign: 'center'}}> Spotify Playlist </h3>
            </div> 
        </div>
    )
}

const songListComparisonStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    // margin: '10px',
    // justifyContent: 'center',
    // alignItems: 'center',
    gridTemplateColumns:'repeat(2, 70% 30%)',

    
} 
export default SonglistComparison
