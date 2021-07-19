import React, { useEffect, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';
import SearchResult from './SearchResult';
import SelectedPlaylist from './SelectedPlaylist';

function SonglistComparison() {
    
    const pbsContext = useContext(PbsContext); 

    // //Gets a SongList from selected PBS Show
    // useEffect(() => {
    //     // console.log(pbsContext.SongList);
    // // eslint-disable-next-line
    //   }, [pbsContext.SongList]);


    const renderSongListData = (song) => {
        // console.log(song);
        // console.log("data sent?>")
        // return(

        //     // <tr key={song.id}>
        //     //     <td style={{border:'1px solid'}}>{song.track} {song.artist} {song.date}</td>
        //     //     {/* <td style={{border:'1px solid'}}><SearchResult songId={song.id} /></td> */}
        //     // </tr>
        // )
    }

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
                    {pbsContext.SongList.forEach((song) => {
                        // console.log(renderSongListData(song))
                        <tr>
                            <td>Some Fucjing Shit</td>
                        </tr>
                        // renderSongListData(song)
                    })}
                </tbody>
            </table>
            <SelectedPlaylist />
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
    gridTemplateColumns:'repeat(2, 70% 30%)'

    
} 
export default SonglistComparison
