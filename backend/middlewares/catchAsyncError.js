//this section handle only async Error and pass to error.js

//func refer async in productController >catchAsyncError >async
module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
//if error occur pass to the error.js


// it catch if any error occur in controllers
