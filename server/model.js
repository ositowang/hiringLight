// mongo related
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/hiringuser';
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', function() {
  console.log('mongo success');
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    //position title
    title: { type: String },
    //if you are boss
    company: { type: String },
    compensation: { type: String },
  },
  chat: {},
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  },
};
