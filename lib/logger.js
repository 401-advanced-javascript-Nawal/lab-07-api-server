'use strict';

// module.exports= (req,res,next) => {
//     // const date = new Date().toLocaleDateString('en-US');                // resource from StackOverFlow to get the time 
//     const time = new Date().toLocaleTimeString('en-US');
//     req.requestTime = time;
//     console.log('req.requestTime : ', req.requestTime);
//     next();
//   } // end of timestamp function 

module.exports = (req, res, next) => {
  console.log(' request Information => ',req.method, req.path);
  next();
};
