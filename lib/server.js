'use strict';

const express = require('express');

// let server use express lib 
const server = express();

// any data will be in json format if it's an object 
server.use(express.json());