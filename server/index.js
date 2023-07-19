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
let users = [];
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

	//Listens and logs the message to the console
	socket.on('message', (data) => {
		socketIO.emit('messageResponse', data);
	});

	socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

	socket.on('newUser', (data) => {
		users.push(data);
		socketIO.emit('newUserResponse', users);
	});

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