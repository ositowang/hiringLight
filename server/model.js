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
    position: { type: String },
    //if you are boss
    company: { type: String },
    salary: { type: String },
  },
  chat: {
    chatId: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    content: { type: String, require: true, default: '' },
    createTime: { type: Number, default: new Date().getTime() },
    read: { type: Boolean, default: false },
  },
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  },
};
