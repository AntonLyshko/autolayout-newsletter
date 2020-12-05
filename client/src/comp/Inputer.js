import React, { useState } from 'react';

const Inputer = (props) => {

  const [state, setState] = useState({
    inputData: ''
  });

const changeHandle = e =>{
  setState({...state, inputData: e.target.value});
}

const handleSubmit = (e, id) =>{
  e.preventDefault();
  props.postLink(id, state.inputData);
  setState({...state, inputData: ''});
}



  return (
      <div className='inputer'>
        Item link: {props.link} <br />
        <form onSubmit={(e)=>handleSubmit(e, props.id)}>
        <input type='text' placeholder='link' onChange={e => changeHandle(e)} value={state.inputData}/>
        <input type='submit' className='inputer-btn' value='Save' />
        </form>
      </div>
  );
};

export default Inputer;
