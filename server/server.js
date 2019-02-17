const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

//app related
const app = express();
app.use(cookieParser('My Secret'));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.listen(9093, function() {
  console.log('Oh yeah 9093');
});
