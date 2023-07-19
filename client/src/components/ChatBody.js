import React from 'react';

const ChatBody = ({ user, selectedUser, messages, typingStatus, lastMessageRef }) => {
  return (
    <>
      <header style={{height: "50px", paddingLeft: "20px", borderBottom: "solid lightgrey 1px"}}>
        {
          selectedUser &&
          <div style={{display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "10px", marginTop: "10px"}}>
            <img src={require(`../assets/${selectedUser.image}`)} alt={selectedUser.nom} style={{borderRadius: "50px", marginRight: "15px", height: "40px", width: "40px"}} />
            <h1>{ selectedUser.nom }</h1>
          </div>
        }
      </header>

      <div id="messageContainer" className="message__container">
        {messages.map((message, i) =>
          message.from === user.id && message.to === selectedUser.id ? (
            <div className="message__chats" key={message.id}>
              {/* <p className="sender__name">Vous</p> */}
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (message.from === selectedUser.id && message.to === user.id ? (
            <div className="message__chats" key={message.id}>
              {/* <p>{selectedUser.nom}</p> */}
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (<div key={i}></div>))
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