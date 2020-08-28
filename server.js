const express = require("express");
const session = require("express-session");
const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const db = require("./db");
const User = require("./models/user");

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static("public"));

app.use(
  session({
    //библиотека express-session - мидлвер для сессий
    secret: "dfgiodhgosjgopsjgpowejf345345",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 6000000 },
  })
);

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

function checkSession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.render("signin");
  }
}

app.get("/", (req, res) => {
  res.render("signin");
});

app.get('/user/new', (req, res) => {
  if (req.session.user.role === 'Менеджер') {
    res.render('createPersonal');
  }
});

app.get("/user/:id", checkSession, async (req, res) => {
  const { id } = req.params;
  const prof = req.query.filter;
  const person = await User.findOne({ _id: id });
  let flagSudo = false;
  if (person.role === 'Менеджер') {
    flagSudo = true;
  }
  if (prof === 'Все') {
    const users = await User.find();
    res.render('mainscreen', { users, person, flagSudo });
  } else {
    const users = await User.find({ profession: prof });
    res.render('mainscreen', { users, person, flagSudo });
  }
});
// let getList = [];
// app.post('/user/filter', async (req, res) => {
//   const filterOut = req.body.filter;
//   const id = req.session.user._id;
//   getList = await User.find({ profession: filterOut });
//   // res.render('mainscreen', { users });
//   res.redirect(`/user/${id}`);
// });

app.post("/user", async (req, res) => {
  const { role, email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.password === password && findUser.role === role) {
      const { id } = findUser;
      req.session.user = findUser;
      res.redirect(`/user/${id}`);
    } else {
      res.render("signin", {
        message: "Неправильно выбрана роль или пароль!!!!!!",
      });
    }
  } else {
    res.render("signin", {
      message: "Неправильно введен логин или пароль!!!!!!",
    });
  }
});

app.get('/personalCard', checkSession, async (req, res) => {
  const user = await User.findOne({ _id: req.session.user._id });
  let coWorkers = await User.find({ profession: req.session.user.profession });
  coWorkers.map(item => {
    if (item._id == req.session.user._id) {
      coWorkers = coWorkers.splice(item, 1);
    }
    return coWorkers;
  });
  res.render('personalCard', { user, coWorkers });
});

app.post('/user/new', async (req, res) => {
  const {
    role, userName, email, profession, password, confirmation,
  } = req.body;
  const double = await User.findOne({ email });
  if (password !== confirmation) {
    res.render('createPersonal', { message: 'Неправильно введен пароль' });
  } else if (double) {
    res.render('createPersonal', { message: 'Email уже существует!!!' });
  } else {
    await User.insertMany({
      role,
      userName,
      email,
      profession,
      password,
    });
    res.redirect(`/user/${req.session.user._id}`);
  }
});

app.listen(3333, () => {
  console.log('work 3333');
});
