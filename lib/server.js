'use strict';

const express = require('express');

// let server use express lib 
const app = express();
const loggerReq = require('./logger.js');

app.use(loggerReq);

// any data will be in json format if it's an object 
app.use(express.json());

/************************************************ Basic Routes *******************************************************/
app.get('/categories', (req,res) =>
{
    console.log('req.query : ', req.query);

    let output = {
        type:req.query.type
    }
    res.status(200).json(output);
}); // end of get categories 

app.post('/categories',(req,res) =>
{
    console.log('req.body : ', req.body );
    res.status(201).json(' item added to categories ');

}); // end of categoires post 

/************************************************ Middle Ware *******************************************************/

function timestamp(){
    return (req,res,next) =>{
        const date = new Date().toLocaleDateString("en-US");
        const time = new Date().toLocaleTimeString("en-US");
        req.requestTime = date + '  ' +  time;
        console.log('req.requestTime : ', req.requestTime);
    }
    
} // end of timestamp function 

app.get('/midWare',timestamp(),(req,res) =>
{
    let output = {
        requestTime : req.requestTime
    }
    res.status(200).json(output);

}); // end of middleWare get route 

/************************************************ Errors **************************************************************/

function errorHander (error,req,res,next){
    res.status(500);
    res.statusMsg = 'Server Error ';
    res.json({error:error});
} // end of errorHander function 

function notFoucnError (req,res,next){
    res.status(404);
    res.statusMsg = ' Not Found ';
    res.json({error:' Not Found '});
} // end of notFoucnError function 

/************************************************ Server Listen *******************************************************/

module.exports = {
    server :app,
    start : port => {
        let PORT = port || process.env.PORT ||3000;
        app.listen (PORT , () => console.log(` listening on port No.${PORT}`));
    }
}