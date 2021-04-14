import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import pbsContext from '../../context/pbs/pbsContext';

const Showselect = ({ getShowList} ) => {

    useEffect(() => {
        getShowList();
        // eslint-disable-next-line
      }, []);

    // const pbsContext = useContext(pbsContext);

    const [Showlist, setShowlist] = useState('');


    const onClick = e =>{
        setShowlist('Onclick Data Recieved')

    };
    return (
        <div>
            <button onClick={onClick}>Get Shows!</button>
        </div>
    )
}

export default Showselect



    // const GetShowList = async => {
    //     const res = await axios
    //     .get('https://airnet.org.au/rest/stations/3pbs/programs');
    //     // res.data.forEach((program, index) => {
    //     // if(program.programRestUrl !== "https://airnet.org.au/rest/stations/3pbs/programs/"){
    //     //     this.setState({Showlist: [...this.state.Showlist, {id: index, name: program.name, url: program.programRestUrl}]});
    //     // }
    //     // })  
    //     this.setState({Showlist:['Data Recieved!']})
    // };
