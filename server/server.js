const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const models = require('./model');
const Chat = models.getModel('chat');
// Chat.remove({}, function(e, d) {});

io.on('connection', function(socket) {
  socket.on('sendMsg', function(data) {
    const { from, to, msg } = data;
    const chatId = [from, to].sort().join('_');
    Chat.create({ chatId, from, to, content: msg }, function(err, doc) {
      console.log(doc._doc);
      const data = Object.assign({}, doc._doc);
      io.emit('receive', data);
    });
  });
});
//app related

app.use(cookieParser('My Secret'));
app.use(bodyParser.json());
app.use('/user', userRouter);
server.listen(9093, function() {
  console.log('Oh yeah 9093');
});
