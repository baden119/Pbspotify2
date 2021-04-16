import React, { useState, useEffect, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';

const Showselect = () => {
    
    const pbsContext = useContext(PbsContext);

    useEffect(() => {
        pbsContext.getShowList();
        // eslint-disable-next-line
      }, []);

    // const [ShowSelectText, setShowSelectText] = useState('');

    const onClick = e =>{
    pbsContext.setShowSelectText();
    };

    return (
        <div>
            <h2>Number of Shows in State: {pbsContext.AppShowList.length} </h2>
            <button onClick={onClick}>Set Component State Text</button>
            <h3>{pbsContext.ShowSelectText}</h3>
        </div>
    )
}

export default Showselect

