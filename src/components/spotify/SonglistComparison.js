import React, { useEffect, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';

function SonglistComparison() {
    
    const pbsContext = useContext(PbsContext);

    //Gets a list of PBS Shows
    useEffect(() => {
        pbsContext.setSongList();
      }, [pbsContext.SelectedShow]);

    return (
        <div>
            <h5>Songleist Comprison</h5>
        </div>
    )
}

export default SonglistComparison
