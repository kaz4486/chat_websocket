const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

let messages = [];
let users = [];

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
    console.log(messages);
  });
  socket.on('join', (user) => {
    console.log("Oh, I've got something from " + socket.id);
    users.push(user);
    console.log(users);
    socket.broadcast.emit('join', user);
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    const userLeft = users.find((user) => user.id === socket.id);
    console.log(userLeft);
    socket.broadcast.emit('removeUser', userLeft.name);
    users = users.filter((user) => user.id !== socket.id);
    console.log(users);
  });
  console.log("I've added a listener on message and disconnect events \n");
});

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
