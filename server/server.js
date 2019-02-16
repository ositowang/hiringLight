const express = require('express');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', function() {
  console.log('mongo success');
});

const User = mongoose.model(
  'user',
  new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
  }),
);
User.create(
  {
    name: 'test',
    age: 18,
  },
  function(err, doc) {
    if (!err) {
      console.log(doc);
    } else {
      console.log(err);
    }
  },
);
const app = express();

app.get('/data', function(req, response) {
  User.find({}, function(err, doc) {
    response.json(doc);
  });
});
app.listen(9093, function() {
  console.log('Oh yeah 9093');
});
