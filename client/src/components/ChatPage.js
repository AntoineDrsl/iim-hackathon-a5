import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import {json, useParams} from "react-router-dom";
import jsonData from '../assets/data.json';

const ChatPage = ({ socket }) => {
	const [messages, setMessages] = useState([]);
	const [chatbotMessages, setChatbotMessages] = useState([]);
	const [typingStatus, setTypingStatus] = useState('');
	const lastMessageRef = useRef(null);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [selectedUser, setSelectedUser] = useState(users[0])
	const [botActivated, setBotActivated] = useState(false);
	
	const { id } = useParams()

	const handleSetSelectedUser = selectedUser => {
		setBotActivated(false);
		socket.emit('getHistory', selectedUser);
		setSelectedUser(selectedUser);
	}

	const handleSetChatbotMessages = chatbotMessages => {
		setChatbotMessages(chatbotMessages);
	}

	const handleBotActivated = botActivated => {
		if(botActivated) {
			setSelectedUser(null)
			socket.emit('getChatbotHistory');
		}
		setBotActivated(botActivated);
	}

	useEffect(()=>{
		if (id) {
			setSelectedUser(jsonData.students.find(element => element.id === id));
		}
		setUsers(jsonData.students);
	},[]);
	
	useEffect(() => {
		socket.on('newUserResponse', (data) => {
			setUsers(data.users);
			setUser(data.user);
			if(id && id !== data.user.id){
				setSelectedUser(data.users.find(element => element.id === id));
			} else {
				setSelectedUser(data.users[0]);
			}
			socket.emit('getHistory', data.users[0]);
		});
	}, [socket, users]);

	useEffect(() => {
		socket.on('messageResponse', (messages) => setMessages(messages));
	}, [socket, messages]);

	useEffect(() => {
		socket.on('chatbotResponse', (chatbotMessages) => setChatbotMessages(chatbotMessages));
	}, [socket, chatbotMessages]);

	useEffect(() => {
		socket.on('getHistoryResponse', (messages) => setMessages(messages));
	}, [socket, messages]);

	useEffect(() => {
		socket.on('getChatbotHistoryResponse', (chatbotMessages) => setChatbotMessages(chatbotMessages));
	}, [socket, chatbotMessages]);

	useEffect(() => {
		function scrollParentToChild(parent, child) {

			// Where is the parent on page
			var parentRect = parent.getBoundingClientRect();
			// What can you see?
			var parentViewableArea = {
			  height: parent.clientHeight,
			  width: parent.clientWidth
			};
		  
			// Where is the child
			var childRect = child.getBoundingClientRect();
			// Is the child viewable?
			var isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parentViewableArea.height);
		  
			// if you can't see the child try to scroll parent
			if (!isViewable) {
				  // Should we scroll using top or bottom? Find the smaller ABS adjustment
				  const scrollTop = childRect.top - parentRect.top;
				  const scrollBot = childRect.bottom - parentRect.bottom;
				  if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
					  // we're near the top of the list
					  parent.scrollTop += scrollTop;
				  } else {
					  // we're near the bottom of the list
					  parent.scrollTop += scrollBot;
				  }
			}
		}

		const parent = document.getElementById('messageContainer');
		scrollParentToChild(parent, lastMessageRef.current);
	}, [messages]);


	useEffect(() => {
		socket.on('typingResponse', (data) => setTypingStatus(data));
	}, [socket]);

  return (
    <div style={{width: "100%", height: "80vh", display: "flex"}}>
		<div style={{position: "absolute", top: "0", right: "0", zIndex: "9999"}}>{ user?.nom }</div>
		<div style={{width: "25%", height: "100%"}}>
			<ChatBar 
				users={users} 
				selectedUser={selectedUser}
				handleSetSelectedUser={handleSetSelectedUser}
				botActivated={botActivated}
				handleBotActivated={handleBotActivated}
			/>
		</div>
		<div  style={{width: "75%"}}>
			<ChatBody 
				user={user}
				selectedUser={selectedUser}
				messages={messages}
				typingStatus={typingStatus}
				lastMessageRef={lastMessageRef} 
				botActivated={botActivated}
				chatbotMessages={chatbotMessages}
			/>
			<ChatFooter 
				socket={socket} 
				user={user}
				selectedUser={selectedUser}
				botActivated={botActivated}
				chatbotMessages={chatbotMessages}
				handleSetChatbotMessages={handleSetChatbotMessages}
			/>
		</div>
	</div>
  );
};

export default ChatPage;