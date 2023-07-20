const ChatBar = ({ users, selectedUser, handleSetSelectedUser, botActivated, handleBotActivated }) => {
  return (
    <div style={{width: "100%", height: "100%", paddingLeft: "20px", borderRight: "1px solid lightgrey"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "75px"}}>
        <h1 style={{color: "#6758A2"}}>Conversations</h1>
      </div>
         
      <div style={{height: "100%"}}>
        <h4 style={{marginBottom: "10px"}}>Messages</h4>
        <div style={{height: "450px", overflowY: "scroll"}}>
          <div
            style={{width: "100%", height: "50px", display: "flex", justifyContent: "start", alignItems: "center", cursor: "pointer", paddingLeft: "10px", backgroundColor: `${botActivated ? 'lightgrey': ''}` }}
            onClick={() => handleBotActivated(true)}
          >
            <img src={require(`../assets/robot.png`)} alt="DevinciBot" style={{borderRadius: "50px", marginRight: "15px", height: "40px", width: "40px"}} />
            <p>DeVinciBot</p>
          </div>

          {users.map((user) => (
            <div
              style={{width: "100%", height: "50px", display: "flex", justifyContent: "start", alignItems: "center", cursor: "pointer", paddingLeft: "10px", backgroundColor: `${user.id === selectedUser?.id ? 'lightgrey': ''}`}}
              key={user.id}
              onClick={() => handleSetSelectedUser(user)}
            >
              <img src={require(`../assets/${user.image}`)} alt={user.nom} style={{borderRadius: "50px", marginRight: "15px", height: "40px", width: "40px"}} />
              <p>{user.nom}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;