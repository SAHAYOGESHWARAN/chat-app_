import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Presence = ({ userId }) => {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/presence/${userId}`);
        setPresence(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPresence();
  }, [userId]);

  return (
    <div>
      <span className={`status ${presence?.isOnline ? 'online' : 'offline'}`}>
        {presence?.isOnline ? 'Online' : `Last seen at ${new Date(presence?.lastSeen).toLocaleTimeString()}`}
      </span>
    </div>
  );
};

export default Presence;
