import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from '../utils/axiosInstance';

const Chat = () => {
  const { tagetUserId } = useParams();
  const [message, setMessage] = useState('');
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', {
      firstName: user.firstName,
      userId,
      tagetUserId,
      text: message,
    });
  };

  const fetchChat = async () => {
    try {
      let chat = await axios.get(`/chat/${tagetUserId}`);
      let data = chat.data.messages.map((chat) => ({
        text: chat.text,
        name: chat.senderId.firstName,
        userId: chat.senderId._id,
      }));

      setMessages([...data]);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(messages);
  useEffect(() => {
    fetchChat();
    const socket = createSocketConnection();
    socket.emit('joinChat', { userId, tagetUserId });
    socket.on('messageReceived', ({ firstName, text, senderId }) => {
      setMessages((prev) => [
        ...prev,
        {
          text,
          name: firstName,
          userId: senderId,
        },
      ]);
    });
    setMessage('');
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-50">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 overflow-auto">
        {messages.map((chat, index) => {
          const isSelf = chat.userId === userId;
          return (
            <div
              className={`chat ${isSelf ? 'chat-end' : 'chat-start'}`}
              key={index}
            >
              <div className="chat-header">
                {chat.name}
                {/* <time className="text-xs opacity-50">2 hours ago</time> */}
              </div>
              <div className="chat-bubble">{chat.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div ref={messagesEndRef} />

      {/* Input Area */}
      <div className="border-t bg-white px-4 py-3 flex items-center gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
              setMessage('');
            }
          }}
          placeholder="Type your message..."
          rows={1}
          className="textarea textarea-bordered w-full resize-none"
        />
        <button onClick={handleSend} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
