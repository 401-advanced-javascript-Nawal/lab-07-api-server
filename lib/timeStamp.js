'use strict';

module.exports = function timestamp() {
  return (req, res, next) => {
    const date = new Date().toLocaleDateString('en-US');                // resource from StackOverFlow to get the time 
    const time = new Date().toLocaleTimeString('en-US');
    req.requestTime = date + '  ' + time;
    console.log('req.requestTime : ', req.requestTime);
    next();
  };
  
}; // end of timestamp function 