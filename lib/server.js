'use strict';

const express = require('express');

// let server use express lib 
const server = express();

// any data will be in json format if it's an object 
server.use(express.json());

const PORT = process.env.PORT || 3000 ;



module.exports = {
    server :app,
    start : port => {
        let PORT = port || process.env.PORT ||3000;
        app.listen (PORT , () => console.log(` listening on port No.${PORT}`));
    }
}