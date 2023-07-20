import React, { useState } from 'react';
import axios from 'axios';

const ChatFooter = ({ socket, user, selectedUser, botActivated, chatbotMessages, handleSetChatbotMessages }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing...`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Send to other user
    if (message.trim() && selectedUser) {
      socket.emit('message', {
        id: `${socket.id}${Math.random()}`,
        text: message,
        from: user.id,
        to: selectedUser.id,
      });

    // Send to bot
	  } else if(message.trim() && botActivated && !isLoading) {
      setIsLoading(true);
      const id = `${socket.id}${Math.random()}`;
      chatbotMessages.push({ id: id, message: message, response: null });
      handleSetChatbotMessages(chatbotMessages);
      axios.post('http://localhost:4000/chatbot', {
        text: message,
        user: user,
      }).then(res => {
        socket.emit('chatbot', {
          id: id,
          message: message,
          response: res.data?.choices ? res.data.choices[0].message.content : 'Désolé, je ne saurais répondre à votre question.',
        });
        setIsLoading(false);
      })
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Rédiger un message..."
          className="message"
          value={message}
          style={{padding: "20px 10px", borderRadius: "20px", marginBottom: "0px"}}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">{ botActivated && isLoading ? '...' : 'Envoyer'}</button>
      </form>
    </div>
  );
};

export default ChatFooter;