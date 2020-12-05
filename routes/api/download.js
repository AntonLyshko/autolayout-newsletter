const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');




function contentCreater(images){
  let content = ``;
  let campain = images[0].campain;
  let title = images[0].title;
  let oneRow = [];
  for(key in images){
    let item = images[key];
    let linkItems = item.link.split('#');
    if(linkItems.length > 1){
      item.link = `${linkItems[0]}?utm_source=mailing&utm_medium=email&utm_campaign=${campain}#${linkItems[1]}`;
    }else{
      item.link = `${item.link}?utm_source=mailing&utm_medium=email&utm_campaign=${campain}`;
    }
  }

  for (key in images) {
    const item = images[key];
    if(item.width >= 600){
      content += ` <tr>
      <td style="margin: 0; padding: 0; line-height: 0;">
        <a href="${item.link}"><img src="http://data.ageo.cz/mailing_2020/${campain}/${item.name}" alt="" width="${item.width}" height="${item.height}"></a>
      </td>
    </tr>
    `
    }else{
      if(oneRow.length == 0){
        content += `
        <tr>
          <td style="margin: 0; padding: 0; line-height: 0;">
              <table width="600" border="0" cellspacing="0" cellpadding="0">
                  <tbody><tr>
                      <td style="margin: 0; padding: 0; line-height: 0;">
                        <a href="${item.link}"><img src="http://data.ageo.cz/mailing_2020/${campain}/${item.name}" alt="" width="${item.width}" height="${item.height}"></a>
                      </td>  
        `
        oneRow.push(item);
      }else{
        oneRow.push(item);
        let sum = 0;
        for (let i = 0; i < oneRow.length; i++) {
          const elem = oneRow[i];
          sum += elem.width;
        }
        if(sum == 600){
          content += `
                <td style="margin: 0; padding: 0; line-height: 0;">
                  <a href="${item.link}"><img src="http://data.ageo.cz/mailing_2020/${campain}/${item.name}" alt="" width="${item.width}" height="${item.height}" /></a>
                </td>  
              </tr>
            </tbody></table>                    
            </td>
          </tr> 
          `
          oneRow = [];
        }else{
          content += `
          <td style="margin: 0; padding: 0; line-height: 0;">
            <a href="${item.link}"><img src="http://data.ageo.cz/mailing_2020/${campain}/${item.name}" alt="" width="${item.width}" height="${item.height}" /></a>
          </td>
    `
        }
      }
    }
  }

  var html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0;">
    <center>
    <table width="600" border="0" cellspacing="0" cellpadding="0">
      <tbody>
          <p style="color: white; font-size: 0"></p>   
          <tr>                
            <td style="margin: 0; padding: 0 20px 0 0; line-height: 0; height: 65px;">
              <p style="text-align: center; color: #494848; font-size: 12px; font-family: Arial; font-style: italic;">Pokud se vám e-mail nezobrazil korektně, <a href="http://www.data.ageo.cz/mailing_2020/${campain}/" style="color: #f72315; font-size: 12px; font-family: Arial; font-style: italic;">klikněte zde</a></p>
            </td>
          </tr>
          ${content}
        </tbody>
      </table>
    </center>
  </body>
  </html>
  `
    return html;
}


const deleteFolder = () =>{
const directory = './client/src/comp/uploads';
fs.readdir(directory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});
}

function Result (html, images){
  this.html = html;
  this.images = images;
}


router.post('/',function(req, res) {
let content = contentCreater(req.body);
setTimeout(()=>{
  let result = new Result(content, req.body);
  res.send(result);
  }, 1000)
  setTimeout(()=>{
    deleteFolder();
    }, 1000)
});

module.exports = router;
