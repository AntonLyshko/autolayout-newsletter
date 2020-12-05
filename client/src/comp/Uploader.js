import React, { useState } from 'react';
import axios from 'axios';
import $ from "jquery";


const Uploader = (props) => {

  const handleSubmit = e => {
    e.preventDefault();
    var fileCount = $('#fileInput').get(0).files.length;
    var formData = new FormData(document.getElementById('myForm'));
    if(fileCount == 1){
      axios.post('/api/upload/singlefile', formData).then(res =>{
        if(res.statusText == "OK"){
          props.changeAppState(res.data);
        }
      })
    }else{
      axios.post('/api/upload', formData).then(res =>{
        if(res.statusText == "OK"){
          props.changeAppState(res.data);
        }
      })
    }
}

  return (
      <div className='file-input'>
        <form  action='' encType="multipart/form-data" id='myForm' onSubmit={e => handleSubmit(e)}>
          Select images: <input className='file-uploader' id='fileInput' type="file"  name="photos" multiple /><br />
          <input type="submit" value="Upload"/>
        </form>
      </div>
  );
};

export default Uploader;