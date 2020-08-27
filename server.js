const express = require('express')
const app = express()
const session = require('express-session')




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
  cookie: { expires: 6000000 }
}));


const server = app.listen(3333, () => {
  console.log('work 3333');
})

app.get('/', (req, res) => {
  res.render('signin');
});

app.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.password === password) {
      req.session.user = findUser;
      const users = await User.find();
      console.log(users);
      res.render('mainscreen', { users });
    }
  } else {
    res.redirect('/');
  }
});


const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.username = "Anonymous"

    socket.on('change_username', (data) => {
  
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
    
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className});
    })

    socket.on('typing', (data) => {
      
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})



// users =[]
// connections = []

// io.sockets.on('connection', function(socket){
//   console.log('Успешное соединение')
//   connections.push(socket);

//   socket.on('disconnect', function(data){
//     connections.splice(connections.indexOf(socket),1)
//   console.log('Отключились')
//   })

//   socket.on('send mess', function(data){
//     io.sockets.emit('add mess', {mess: data.mess,name: data.name})
//   })
// })
