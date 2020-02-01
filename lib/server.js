'use strict';

const express = require('express');

// let server use express lib 
const app = express();
const loggerReq = require('./logger.js');
const timeS = require('./logger.js');

app.use(loggerReq);
app.use(timeS);
// const timeS = require('./timeStamp.js');
// app.use(timeS);
// any data will be in json format if it's an object 
app.use(express.json());

/************************************************ Basic Routes *******************************************************/
// categories Basic Routes 

app.get('/categories', timestamp(),(req, res) => {
  console.log('req.query : ', req.query);

  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
}); // end of get categories 

app.post('/categories',timestamp(), (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json(' item added to categories ');

}); // end of categoires post 

// Products Basic Routes 
app.get('/products',timestamp(), (req, res) => {
  console.log('req.query : ', req.query);

  let output = {
    type: req.query.type,
  };
  res.status(200).json(output);
}); // end of get products 

app.post('/products',timestamp(), (req, res) => {
  console.log('req.body : ', req.body);
  res.status(201).json(' item added to Products ');

}); // end of products post 

/************************************************ Middle Ware *******************************************************/

function timestamp() {
  return (req, res, next) => {
    const date = new Date().toLocaleDateString('en-US');                // resource from StackOverFlow to get the time 
    const time = new Date().toLocaleTimeString('en-US');
    req.requestTime = date + '  ' + time;
    console.log('req.requestTime : ', req.requestTime);
    next();
  };

} // end of timestamp function 

app.get('/midWare', timestamp(), (req, res) => {
  let output = {
    requestTime: req.requestTime,
  };
  // console.log('requestTime : ', requestTime);
  res.status(200).json(output);

}); // end of middleWare get route 

/************************************************ Errors **************************************************************/

function errorHander(error, req, res, next) {
  res.status(500);
  res.statusMsg = 'Server Error ';
  res.json({ error: error });
} // end of errorHander function 

function notFoucnError(req, res, next) {
  res.status(404);
  res.statusMsg = ' Not Found ';
  res.json({ error: ' Not Found ' });
} // end of notFoucnError function 

app.get('/gen-error',timestamp(), (req, res) => {
  throw new Error(' Real-Time Error ');
}); // end of get error 

/************************************************ API Routes **********************************************************/

let db = [];

// categories API Routes 
app.get('/api/v1/categories',timestamp(), (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
}); // end of api get categories 

app.get('/api/v1/categories/:id',timestamp(), (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record);
}); // end of api get categories by ID 

app.post('/api/v1/categories',timestamp(), (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
}); // end of api post categories 

app.put('/api/v1/categories/:id',timestamp(), (req, res, next) => {
  let idUpdate = req.params.id;
  let { name, id } = req.body;
  let recordUpdate = { name, id };
  db = db.map((record) => (record.id === parseInt(idUpdate)) ? recordUpdate : record);
  res.json(recordUpdate);
}); // end of api put categories by ID 

app.delete('/api/v1/categories/:id',timestamp(), (req, res, next) => {
  let idDelete = req.params.id;
  db = db.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: ' Item Deleted' });
}); // end of api put categories by ID 


// Products API Routes 

app.get('/api/v1/products',timestamp(),(req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
}); // end of api get Products 

app.get('/api/v1/products/:id',timestamp(), (req, res, next) => {
  let id = req.params.id;
  let record = db.filter(record => record.id === parseInt(id));
  res.json(record);
}); // end of api get Products by ID 

app.post('/api/v1/products',timestamp(), (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
}); // end of api post Products 

app.put('/api/v1/products/:id',timestamp(), (req, res, next) => {
  let idUpdate = req.params.id;
  let { name, id } = req.body;
  let recordUpdate = { name, id };
  db = db.map((record) => (record.id === parseInt(idUpdate)) ? recordUpdate : record);
  res.json(recordUpdate);
}); // end of api put Products by ID 

app.delete('/api/v1/products/:id', timestamp(),(req, res, next) => {
  let idDelete = req.params.id;
  db = db.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: ' Item Deleted' });
}); // end of api put Products by ID

/************************************************ Server Listen *******************************************************/

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` listening on port No.${PORT}`));
  },
};