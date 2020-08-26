const express = require('express')
const app = express()

const mongoose = require("mongoose");
const path = require('path');
const session = require('express-session');
const db = require('./db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ //библиотека express-session - мидлвер для сессий
  secret: 'dfgiodhgosjgopsjgpowejf345345',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 6000000 }
}));


module.exports = app






app.listen(3333, () => {
  console.log('work 3333');
})
