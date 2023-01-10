const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const errorMiddleware = require('./middlewares/error');

app.use(cookieParser());
app.use('/api/v1/', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
//middleware (use in last for handling error if it occur)
app.use(errorMiddleware);
module.exports = app;
