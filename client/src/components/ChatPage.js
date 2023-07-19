import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
	const [messages, setMessages] = useState([]);
	const [typingStatus, setTypingStatus] = useState('');
	const lastMessageRef = useRef(null);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(users[0]);

	const handleSetUser = user => {
		setUser(user)
	}

	useEffect(() => {
		socket.on('newUserResponse', (data) => {
			setUsers(data)
			setUser(data[0])
		});
	}, [socket, users]);

	useEffect(() => {
		socket.on('messageResponse', (data) => setMessages([...messages, data]));
	}, [socket, messages]);

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);


	useEffect(() => {
		socket.on('typingResponse', (data) => setTypingStatus(data));
	}, [socket]);

  return (
    <div style={{width: "100%", display: "flex"}}>
		<div style={{width: "25%", height: "100%"}}>
			<ChatBar 
				users={users} 
				selectedUser={user}
				handleSetUser={handleSetUser}
			/>
		</div>
		<div  style={{width: "75%"}}>
			<ChatBody 
				user={user}
				messages={messages}
				typingStatus={typingStatus}
				lastMessageRef={lastMessageRef} 
			/>
			<ChatFooter socket={socket} />
		</div>
	</div>
  );
};

export default ChatPage;