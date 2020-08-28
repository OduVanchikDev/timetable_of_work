const express = require('express')
const app = express()
const session = require('express-session')

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


function checkSession(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user
    next();
  } else {
    res.render("signin");
  }
}

app.get("/", (req, res) => {
  res.render("signin");
});

app.get("/user/new", (req, res) => {
  res.render("createPersonal");
});

app.get("/user/:id", checkSession, async (req, res) => {
  const { id } = req.params;
  const users = await User.find();
  const person = await User.findOne({ _id: id });
  res.render("mainscreen", { users, person });
});

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

app.post("/user/new", async (req, res) => {
  const { role, userName, email, profession, password } = req.body;
  await User.insertMany({
    role,
    userName,
    email,
    profession,
    password,
  });
  res.redirect('/');
});

app.get('/days/:id', (req, res) => {
  let workDays = [2, 5, 9]
  res.json(workDays)
})


const server = app.listen(3333, () => {
  console.log('work 3333');
})
const io = require("socket.io")(server);
io.on('connection', async (socket) => {
  // console.log('New user connected')
 
  // socket.username = "Anonymous"
 
  // socket.on('change_username', (data) => {
  //   socket.username = data.username
  //   console.log(socket.username);
  // })
  socket.on('new_message', async (data) => {
    const userId = data.userID;
    const userDataBase = await User.findOne({_id: userId })
    userDataBase.message.push(data.message);
    await userDataBase.save()
    // отправка в клиентский
    io.sockets.emit('add_mess', { message: data.message, username: userDataBase.userName, className: data.className });
  })
  // socket.on('typing', (data) => {
  //    // отправка всем клиентам, кроме отправителя
  //   socket.broadcast.emit('typing', { username: socket.username })
  //     // io.to(socketId).emit('hey', 'I just met you');
  // })
})
