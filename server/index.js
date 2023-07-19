const PORT = 4000;
const express = require('express');
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

  // Get history
  socket.on('getHistory', selectedUser => {
    const currentUser = users.find(u => u.socketId === socket.id);
		socketIO.to(socket.id).emit('getHistoryResponse', messages.filter(msg => (msg.from === currentUser.id && msg.to === selectedUser.id) || (msg.from === selectedUser.id && msg.to === currentUser.id)));
  })

  socket.on('getChatbotHistory', () => {
    const currentUser = users.find(u => u.socketId === socket.id);
		socketIO.to(socket.id).emit('getChatbotHistoryResponse', currentUser.chatbotMessages);
  })

  socket.on('chatbot', data => {
    const currentUser = users.find(u => u.socketId === socket.id);
    currentUser.chatbotMessages.push({
      id: data.id,
      message: data.message,
      response: data.response,
    })
    socketIO.to(socket.id).emit('chatbotResponse', currentUser.chatbotMessages);
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
    organization: "org-GcpmWMKjECb4p8505NSs0pmd",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// GPT route
app.post('/chatbot', async (req, res) => {
	try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "Réponds aux prochaines questions concernant les étudiants que je vais te donner dans un fichier JSON que tu dois parser. Si ce n'est pas le sujet, dis que tu ne sais pas répondre à la question. Ne précise pas dans tes réponses que tu trouves les informations dans un fichier JSON. Lorsqu'on cherche un étudiant, ne donne que son nom et son adresse email pour le contacter."},
        {"role": "system", "content": JSON.stringify(data.students.slice(0, 5))},
        {"role": "user", "content": req.body.text},
      ]
    });
    console.log(response.data)
    res.send(response.data);
  } catch (e) {
      console.log({ e });
  }
});

// Launch server
server.listen(PORT, () => console.log('Server started at port : ' + PORT));