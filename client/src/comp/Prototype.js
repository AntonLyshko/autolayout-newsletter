import React, {Fragment} from 'react';



const Prototype = (props) => {

const handleClick = (id, link) =>{
  props.inputManager(id, link);
}


const renderImages = () =>{
const importAll = (r) => {
    return r.keys().map(r);
}
const sortFiles = (images) =>{
  return images.sort(compare);
  function compare(a, b) {  
    let nameA = a.name;
    let nameB = b.name;
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }
} 
  let images = importAll(require.context('./uploads', false, /\.(png|jpe?g|svg)$/));
  let data = props.data;
  sortFiles(data);
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    item.path = images[i];
  }
  return props.data.map((item) => {
    return (
        <div key={item.id} className='img-item' onClick={() => handleClick(item.id, item.link)}>
          <img src={item.path} width={item.width} height={item.height} />
        </div>
    );
})
}
 


  return (
      <div className='img-container'>
          <Fragment>
      {props.status ? (
        <div className='prototype-container'>
          {renderImages()}
        </div>
      ) : (
        <Fragment>
            
        </Fragment>
      )}
    </Fragment>
      </div>
  );
};

export default Prototype;