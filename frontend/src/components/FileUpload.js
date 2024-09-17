import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const FileUpload = () => {
  const { currentChat, addMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('chatId', currentChat._id);
    formData.append('senderId', user._id);

    try {
      const res = await axios.post('http://localhost:5000/api/chat/file', formData);
      addMessage(res.data);
    } catch (err) {
      console.error('File upload failed', err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
