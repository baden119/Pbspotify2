import React, { useContext, useState } from 'react'
import PbsContext from '../../context/pbs/pbsContext'

const Showselect = () => {

    const pbsContext = useContext(PbsContext);


    return (
        <div>
            <h1>PBSpotify 2.0</h1>
            <h3>
                A list of Pbs Shows
            </h3>
        </div>
    )
};

export default Showselect
