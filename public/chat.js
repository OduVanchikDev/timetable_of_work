$(function() {
  let socket = io.connect("http://localhost:3333");

  let username = $("#username");
  let send_message = $("#send_message");
  let send_username = $("#send_username");
  let chatroom = $("#chatroom");
  let feedback = $("#feedback");
  let message = $("#message");

  send_message.click(() => {
    socket.emit("new_message", {
      message: message.val(),
      className: alertClass
    });
  });
  let min = 1;
  let max = 6;
  let random = Math.floor(Math.random() * (max - min)) + min;

  // Устаналиваем класс в переменную в зависимости от случайного числа
  // Эти классы взяты из Bootstrap стилей
  let alertClass;
  switch (random) {
    case 1:
      alertClass = "secondary";
      break;
    case 2:
      alertClass = "danger";
      break;
    case 3:
      alertClass = "success";
      break;
    case 4:
      alertClass = "warning";
      break;
    case 5:
      alertClass = "info";
      break;
    case 6:
      alertClass = "light";
      break;
  }

  socket.on("add_mess", data => {
    feedback.html("");
    message.val("");
    chatroom.append(
      "<div class='alert alert-" +
        data.className +
        "'<b>" +
        data.username +
        "</b>: " +
        data.message +
        "</div>"
    );
  });

  send_username.click(() => {
    socket.emit("change_username", { username: username.val() });
    console.log( username.val() )
  });

  message.bind("keypress", () => {
    socket.emit("typing");
  });

  socket.on("typing", data => {
    console.log(data);
    feedback.html(
      "<p><i>" + data.username + " печатает сообщение..." + "</i></p>"
    );
  });
});
// // -------------------------------------------
// const io = require("socket.io-client")
// const readline =  require('readline')
// const socket = io.connect('http://localhost:3333', {reconnect: true})

// const rl = readline.createInterface({
//   input:process.stdin,
//   output: process.stdout
// })


// socket.on("connect",(socket)=>{
//   console.log("Connected!");
//   rl.question("what you nickname", (answer)=>{
//     nickname = answer
//   })
// })

// // --------------------------------------
