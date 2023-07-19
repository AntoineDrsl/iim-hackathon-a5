const PORT = 4000;
const express = require('express');
const axios = require("axios");
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const data = require('./../client/src/assets/data.json')


app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
// Cors
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Socket
const users = data.students
const messages = []

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Get new user (in order)
  const newUser = users.find(u => !u.connected);
  newUser.connected = 1
  newUser.socketId = socket.id
	socketIO.to(socket.id).emit('newUserResponse', {
    user: newUser,
    users: users.filter(u => u.id !== newUser.id),
  });

	// Listens and logs the message to the console
	socket.on('message', (message) => {
    messages.push(message);

    const sender = users.find(u => u.id === message.from);
    const receiver = users.find(u => u.id === message.to);

    // Send to sender and receiver
		socketIO.to([sender.socketId, receiver.socketId]).emit('messageResponse', messages.filter(msg => (msg.from === sender.id && msg.to === receiver.id) || (msg.from === receiver.id && msg.to === sender.id)));
	});

  socket.on('getHistory', selectedUser => {
    const currentUser = users.find(u => u.socketId === socket.id);
		socketIO.to(socket.id).emit('getHistoryResponse', messages.filter(msg => (msg.from === currentUser.id && msg.to === selectedUser.id) || (msg.from === selectedUser.id && msg.to === currentUser.id)));
  })

  // Typing
	socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  // Disconnect
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    const user = users.find(u => u.socketId === socket.id);
    user.connected = 0;
    user.socketId = null;
    socket.disconnect();
  });
});

// Test route
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

const configuration = new Configuration({
    organization: "org-DugElkDJb22kcqyz8lY1PblU",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


// GPT route
app.post('/gpt', async (req, res) => {
	try {
		const ASSISTANT = {"role": "system", "content": req.body.text};
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
			messages: [
                ASSISTANT
            ]
        });
        res.send(response.data);
    } catch (e) {
        console.log({ e });
    }
  });

// Launch server
server.listen(PORT, () => console.log('Server started at port : ' + PORT));