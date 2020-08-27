const express = require('express')
const app = express()

const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./db');
const User = require('./models/user');

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static('public'));

app.use(session({ //библиотека express-session - мидлвер для сессий
  secret: 'dfgiodhgosjgopsjgpowejf345345',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 6000000 },
}));

function checkSession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.render('signin');
  }
}

app.get('/', (req, res) => {
  res.render('signin');
});

app.get('/user/new', (req, res) => {
  res.render('createPersonal');
});

app.get('/user/:id', checkSession, async (req, res) => {
  const { id } = req.params;
  const users = await User.find();
  const person = await User.findOne({ _id: id });
  res.render('mainscreen', { users, person });
});

app.post('/user', async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.password === password) {
      const { id } = findUser;
      req.session.user = findUser;
      res.redirect(`/user/${id}`);
    }
  } else {
    res.redirect('/');
  }
});


app.post('/user/new', async (req, res) => {
  const {
    role, userName, email, password,
  } = req.body;
  await User.insertMany({
    role,
    userName,
    email,
    password,
  });
  res.redirect('/');
});

app.listen(3333, () => {
  console.log('work 3333');
})

