const express = require('express');
const fs = require('fs/promises');

const puerto = 8080;

const app = express();

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

let visitas = 0;
let visitasRandom = 0;

app.get('/items', (request, response) => {
  visitas++;
  fs.readFile('texto.txt')
  .then((fileData) => {
        response.json({
            "items": JSON.parse(fileData.toString()),
            "cantidad": JSON.parse(fileData.toString()).length
          });
  })
  .catch((err) => {
      console.log(err)
  })
});

app.get('/item-random', (request, response) => {
    visitasRandom++;
    fs.readFile('texto.txt')
    .then((fileData) => {
        response.json({
            "item": JSON.parse(fileData.toString())[Math.floor(Math.random()*JSON.parse(fileData.toString()).length)],
            });
    })
    .catch((err) => {
        console.log(err)
    })
});

app.get('/visitas', (request, response) => {
    response.json({
        "visitas": {
            "items": visitas,
            "item": visitasRandom
        }
    })

});
