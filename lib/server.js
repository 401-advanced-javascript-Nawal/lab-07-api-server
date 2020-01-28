'use strict';

const express = require('express');

// let server use express lib 
const app = express();
const loggerReq = require('./logger.js');

// any data will be in json format if it's an object 
app.use(express.json());

/************************************************ Basic Routes *******************************************************/
app.get('/categories', (req,res) =>
{
    console.log('req.query : ', req.query);

    let output = {
        type:req.body.type
    }
    res.status(200).json(output);
}); // end of get categories 

app.post('/categories',(req,res) =>
{
    console.log('req.body : ', req.body );
    res.status(201).send(' item added to categories ');

}); // end of categoires post 

/************************************************ Middle Ware *******************************************************/

function timestamp(){
    return (req,res,next) =>{
        const time = new Date();
        req.requestTime = time.getTime();
        console.log('req.requestTime : ', req.requestTime);
    }
} // end of timestamp function 

timestamp();

/************************************************ Errors **************************************************************/

function errorHander (error,req,res,next){
    req.status(500);
    req.statusMsg = 'Server Error ';
    req.json({error:error});
} // end of errorHander function 

function notFoucnError (req,res,next){
    req.status(404);
    req.statusMsg = ' Not Found ';
    req.json({error:' Not Found '});
} // end of notFoucnError function 

/************************************************ Server Listen *******************************************************/

module.exports = {
    server :app,
    start : port => {
        let PORT = port || process.env.PORT ||3000;
        app.listen (PORT , () => console.log(` listening on port No.${PORT}`));
    }
}