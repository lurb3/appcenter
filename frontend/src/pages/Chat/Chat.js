import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Chat = ({ socket }) => {
  const user = useSelector((state) => state.user);
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!socket) alert('No socket!');
    socket.emit('message', {
      text: message,
      name: user.name,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  };

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([ ...messages, data ]));
  }, [ socket, messages ]);

  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default Chat;
