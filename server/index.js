const PORT = 4000;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const data = require('./../client/src/assets/data.json')

// Cors
const cors = require('cors');
app.use(cors());

// Socket
let users = data.students

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
	socketIO.emit('newUserResponse', users);

	//Listens and logs the message to the console
	socket.on('message', (data) => {
		socketIO.emit('messageResponse', data);
	});

	socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
	  users = users.filter((user) => user.socketID !== socket.id);
	  socketIO.emit('newUserResponse', users);
	  socket.disconnect();
    });
});

// Test route
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

// Launch server
server.listen(PORT, () => console.log('Server started at port : ' + PORT));