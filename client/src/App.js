import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import './Font.css';
import './App.css';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  const userName = 'Antoine';
  localStorage.setItem('userName', userName);
  socket.emit('newUser', { userName, socketID: socket.id });

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;