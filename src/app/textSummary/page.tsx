"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';
import { Navbar } from '../../components/Navbar';

enum AIModel {
  bart = "bart"
}

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.bart);
  const [authToken, setAuthToken] = useState<string>('');
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);
    setAuthToken(token);
    fetchChatHistory(token);
  }, []);

  const fetchChatHistory = async (authToken: string | null) => {
    console.log("Auth token:", authToken);
    try {
      const response = await axios.get('http://127.0.0.1:5000/chat/getmessages', {
        headers: { "Authorization": authToken },
        params: { model_name: selectedModel }
      });
      
      setChatHistory(response.data.messages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };


  const handleNewChat = () => {
    setChatHistory([]);
  };

  const handleSendClick = async () => {
    try {
      setInputText('')
      const response = await axios.post('http://127.0.0.1:5000/chat', {
        
        messages: [...chatHistory, { role: 'user', content: inputText }],
        model_name: selectedModel
      }, { headers: { "Authorization": authToken } });
      setChatHistory(response.data.messages)
    } catch (error) {
      console.error('Error fetching response from AI:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="chat-interface">
      <div className="sidebar">
        <button onClick={handleNewChat} className="new-chat-button">Clear Chat</button>

      </div>
      <div className="chat-window">

          <div className="chat-history">
            {chatHistory.map((item, index) => (
              <div key={index} className="chat-message">{item.content}</div>
            ))}

          </div>

        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="input-bar"
          />
          <button onClick={handleSendClick} className="send-button">Send</button>
        </div>
      </div>

    </div>
    </>
  );
};

export default ChatInterface;