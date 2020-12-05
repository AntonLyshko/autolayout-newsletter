import React, { useState } from 'react';
import './style.css';
import Uploader from './comp/Uploader'
import Prototype from './comp/Prototype'
import Inputer from './comp/Inputer'
import Downloader from './comp/Downloader'


const App = () => {

  const [state, setState] = useState({
    focusId: null,
    focusLink: null,
    status: false, 
    data: []
  });

  const changeState = (data) =>{
    if(data){
      setState({...state, data: data, status: true});
    }
  }

  const inputManager = (id, link) =>{
    if(id){
      setState({...state, focusId: id, focusLink: link});
    }
    if(link){
      state.data.find((item)=>{
        if(item.id == id){
          item.link = link;

        }
      })
    }
  }
  return (
      <div className='container'>
        <Uploader  changeAppState={changeState} />
        <Inputer id={state.focusId} link={state.focusLink} postLink={inputManager}/>
        <Downloader data={state.data}/>
        <Prototype inputManager={inputManager} data={state.data} status={state.status}/>
      </div>
  );
};

export default App;
