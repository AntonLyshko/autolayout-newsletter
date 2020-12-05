var express = require('express');
var fs = require('fs');
const path = require('path');
const formidable = require('formidable');
var router = express.Router();
const sizeOf = require('image-size');
const image2base64 = require('image-to-base64');

function File (id, name, data, width, height, link, path, title, campain){
  this.id = id;
  this.name = name;
  this.data = data;
  this.width = width;
  this.height = height;
  this.campain = campain;
  this.title = title;
  this.path = path;
  this.link = link;
}

router.post('/singlefile', function(req, res) {
  let array = [];
  let id = 0;
  var form = new formidable.IncomingForm();
  let upload = path.join('././client/src/comp/uploads');
  form.parse(req, function(err, fields, files){
  let file = files.photos;
  let fullName = upload + "/"+ file.name;
  fs.rename(file.path, fullName, err => {
    if(err){
      console.error(err);
    }
    sizeOf(fullName, function (err, size) {
      image2base64(fullName).then((data) => {
        id += 1;
        let img = new File(id, file.name, data, size.width, size.height);
        array.push(img);
        })
  });
});
  setTimeout(()=>{
    res.send(array);
  }, 1500)
})
});

router.post('/', function(req, res) {
  let array = [];
  let id = 0;
  var form = new formidable.IncomingForm({ multiples: true });
  let upload = path.join('././client/src/comp/uploads');
  form.parse(req, function(err, fields, files){
      for (let i = 0; i < files.photos.length; i++) {
        let item = files.photos[i];
        let fullName = upload + "/"+ item.name
        fs.rename(item.path, fullName, err => {
          if(err){
            console.error(err);
          }
          sizeOf(fullName, function (err, size) {
            image2base64(fullName).then((data) => {
              id += 1;
              let img = new File(id, item.name, data, size.width, size.height);
              array.push(img);
            })
          });
        });
      }
      setTimeout(()=>{
        res.send(array);
      }, 1500)
    })
});

module.exports = router;
