import React, { useEffect, useContext } from 'react'
import PbsContext from '../../context/pbs/pbsContext';

const Showselect = () => {
    
    const pbsContext = useContext(PbsContext);

    //Gets a list of PBS Shows
    useEffect(() => {
        pbsContext.getShowList();
        // eslint-disable-next-line
      }, []);


    const showSelection = (e) =>{
        pbsContext.ShowList.forEach((show, index) => {
            if(String(show.id) === e.target.value){
                // Save show info to PbsState
                pbsContext.setShow(show);
            }
        });
    };

    return (
        <div>
            
            <select name="selected show" id="show_select_dropdown" onChange={e => showSelection(e)}>
                {pbsContext.ShowList.map((show) => (
                    <option key={show.id} value={show.id}>{show.name}</option>
                ))};
            </select>
        </div>
    )
}

export default Showselect

