import React, {Fragment, useState } from 'react';
import axios from 'axios';
import Jszip from "jszip";
import {  saveAs }  from 'file-saver';

const Downloader = (props) => {

  const [state, setState] = useState({
    title: '',
    campain: ''
  });

  const changeTitle = e =>{
    setState({...state, title: e.target.value});
  }
  const changeCampain = e =>{
    setState({...state, campain: e.target.value});
  }

  const handleDownload = () =>{
    axios.post('/api/download', props.data).then(res =>{
      if(res.statusText == "OK"){
        const zip = new Jszip();
        let folder = zip.folder(state.campain);
        folder.file('index.html', res.data.html);
       
        for (let i = 0; i < res.data.images.length; i++) {
          let item = res.data.images[i];
          folder.file(item.name, item.data, {base64: true});
        }
        zip.generateAsync({type:"blob"}).then(function(content) {
          saveAs(content, `${state.campain}.zip`);
      });
      }
    })
  }

  const handleSubmit = e =>{
    e.preventDefault();
    props.data[0].campain = state.campain;
    props.data[0].title = state.title;
  }

  return (
      <div>
      <Fragment>
        
          <div className='common-info'>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input type='text' className='title-input' name='title' placeholder='Title' onChange={e => changeTitle(e)} value={state.title}/> 
              <input type='text' name='campain' placeholder='Campain' onChange={e => changeCampain(e)} value={state.campain}/> 
              <input type='submit' value='Save' className='save-btn'/>
            </form>
            <br /><br />
            <button className='download-btn' onClick={()=> handleDownload()}>Download</button>
          </div>
      </Fragment>
        </div>
  );
};

export default Downloader;
