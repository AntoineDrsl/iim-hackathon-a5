import React, { useState } from 'react';

const ChatFooter = ({ socket, user, selectedUser }) => {
  const [message, setMessage] = useState('');

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
	  } else if(message.trim()) {
      console.log('Talking with a bot...');
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
        <button className="sendBtn">Envoyer</button>
      </form>
    </div>
  );
};

export default ChatFooter;