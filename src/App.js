import React, { useState } from 'react'; 
import './App.css';
import axios from 'axios';
import Showselect from './components/pbs/Showselect';

const App = () => {

  const [AppShowList, setAppShowList] = useState([]);

  const getShowList = async () => {
    const res = await axios
    .get('https://airnet.org.au/rest/stations/3pbs/programs');
    res.data.forEach((program, index) => {
    if(program.programRestUrl !== "https://airnet.org.au/rest/stations/3pbs/programs/"){
      setAppShowList([  
        ...AppShowList, 
        {
          id: index,
          name: program.name, 
          url: program.programRestUrl
        }
      ]);
    // }
    console.log(program.name)
    }
    })  
    // setAppShowList(res.data)
  };


  return (
    <div className="App">
      <Showselect getShowList={getShowList}/>
    </div>
  );
}

export default App;
