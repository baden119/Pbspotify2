import React, { useEffect, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';

function SonglistComparison() {
    
    const pbsContext = useContext(PbsContext);

    //Gets a list of PBS Shows
    useEffect(() => {
        pbsContext.setSongList();
      }, [pbsContext.SelectedShow]);

    return (
        <div style={songListComparisonStyle}>
            <div>
                <h3>PBS Songlist</h3>
                <ul>
                    {pbsContext.SongList.map((song) => (
                        <li>{song.track} {song.artist}</li>
                    ))}
                </ul>
            </div>
            {/* <div>
                <h3> Spotify Results </h3>
            </div> */}
        </div>
    )
}

const songListComparisonStyle = {
    display: 'grid',
    height: '100%',
    gridTemplateColumns:'repeat(2, 1fr)'
} 
export default SonglistComparison
