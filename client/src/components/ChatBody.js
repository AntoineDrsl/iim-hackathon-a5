import React from 'react';

const ChatBody = ({ user, selectedUser, messages, typingStatus, lastMessageRef, botActivated, chatbotMessages }) => {
  return (
    <>
      <header style={{height: "50px", paddingLeft: "20px", borderBottom: "solid lightgrey 1px"}}>
        {
          selectedUser ?
          (<div style={{display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "10px", marginTop: "10px"}}>
            <img src={require(`../assets/${selectedUser.image}`)} alt={selectedUser.nom} style={{borderRadius: "50px", marginRight: "15px", height: "40px", width: "40px"}} />
            <h1>{ selectedUser.nom }</h1>
          </div>) : 
          (<div style={{display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "10px", marginTop: "10px"}}>
          <img src={require(`../assets/robot.png`)} alt="DeVinciBot" style={{borderRadius: "50px", marginRight: "15px", height: "40px", width: "40px"}} />
          <h1>DeVinciBot</h1>
        </div>)
        }
      </header>

      <div id="messageContainer" className="message__container">
        {messages.map((message, i) =>
          // User messages
          selectedUser && message.from === user.id && message.to === selectedUser.id ? (
            <div className="message__chats" key={message.id}>
              {/* <p className="sender__name">Vous</p> */}
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>

          // Selected user messages
          ) : (selectedUser && message.from === selectedUser.id && message.to === user.id ? (
            <div className="message__chats" key={message.id}>
              {/* <p>{selectedUser.nom}</p> */}
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>

          // Invisible messages
          ) : (<div key={i}></div>))
        )}


        {chatbotMessages.map((message, i) =>
          // User messages
          botActivated ? (
            <div key={`chatbot_${message.id}`}>
              <div className="message__chats">
                {/* <p className="sender__name">Vous</p> */}
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </div>
            
              <div className="message__chats">
                {/* <p>{selectedUser.nom}</p> */}
                <div className="message__recipient">
                  <p>{message.response}</p>
                </div>
              </div>
            </div>

          // Selected user messages
          ) : (<div key={`chatbot_${i}`}></div>)
        )}

        {/* <div className="message__status">
          <p>{typingStatus}</p>
        </div> */}

        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;