import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); // adjust to your backend URL

const Chat = () => {
  const { currentChat, messages, addMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { chatId: currentChat._id });

    socket.on('receiveMessage', (message) => {
      addMessage(message);
    });

    return () => socket.off('receiveMessage');
  }, [currentChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = { chatId: currentChat._id, senderId: user._id, content };
    socket.emit('sendMessage', newMessage);
    addMessage(newMessage);
    setContent('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === user._id ? 'sent' : 'received'}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
