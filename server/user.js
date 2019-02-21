const express = require('express');
const Router = express.Router();
const models = require('./model');
const utils = require('utility');
const userModel = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = { pwd: 0, __v: 0 };
// Chat.remove({}, function(e, d) {});

Router.post('/update', function(req, res) {
  const { userid } = req.signedCookies;
  if (!userid) {
    return res.json({ code: 1, msg: 'not authorized' });
  }
  const body = req.body;
  userModel.findByIdAndUpdate(userid, body, function(err, doc) {
    const rawData = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type,
      },
      body,
    );
    const { pwd, ...data } = rawData;
    return res.json({ code: 0, data });
  });
});
Router.post('/login', function(req, res) {
  const { user, pwd } = req.body;
  userModel.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({
        code: 1,
        msg: 'username does not exists or password does not match',
      });
    }
    res.cookie('userid', doc._id, {
      expires: new Date(Date.now() + 900000),
      signed: true,
    });
    return res.json({ code: 0, data: doc });
  });
});

Router.get('/list', function(req, res) {
  // userModel.remove({}, function(e, d) {});
  const { type } = req.query;
  userModel.find({ type }, function(err, doc) {
    return res.json({ code: 0, data: doc });
  });
});

Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body;
  userModel.findOne({ user: user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: 'Username already exists' });
    }

    const userData = new userModel({ user, type, pwd: md5Pwd(pwd) });
    userData.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: 'server error' });
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id, {
        expires: new Date(Date.now() + 900000),
        signed: true,
      });
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.get('/info', function(req, res) {
  const { userid } = req.signedCookies;
  if (!userid) {
    return res.json({ code: 1, msg: 'something wrong with the cookies' });
  }
  userModel.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: 'something wrong with the server' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

Router.get('/getMsgList', function(req, res) {
  const { userid } = req.signedCookies;
  console.log(userid);
  // $or: [{ "from": user, "to": user }]
  userModel.find({}, function(err, userDoc) {
    let users = {};
    userDoc.forEach((v) => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
    Chat.find(
      {
        $or: [{ from: userid }, { to: userid }],
      },
      function(err, doc) {
        if (!err) {
          return res.json({ code: 0, msg: doc, users: users });
        }
      },
    );
  });
});

function md5Pwd(pwd) {
  const salt = 'osito%^*%^&*^';
  return utils.md5(utils.md5(pwd + salt));
}
module.exports = Router;
