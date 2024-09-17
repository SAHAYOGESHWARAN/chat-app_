import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import Chat from '../components/Chat';
import FileUpload from '../components/FileUpload';
import Presence from '../components/Presence';

const ChatRoom = ({ chatId }) => {
  const { setCurrentChat } = useContext(ChatContext);

  useEffect(() => {
    // Fetch chat by chatId and set currentChat
    setCurrentChat({ _id: chatId, users: [] });
  }, [chatId, setCurrentChat]);

  return (
    <div className="chat-room">
      <Presence userId={chatId} />
      <Chat />
      <FileUpload />
    </div>
  );
};

export default ChatRoom;
