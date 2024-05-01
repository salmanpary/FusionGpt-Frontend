"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';
import { Navbar } from '../../components/Navbar';
enum AIModel {
  palm2 = "palm2",
  openai = "openai",
  llama2 = "llama2"
}

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.palm2);
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);
    setAuthToken(token);
    fetchChatHistory(token);
  }, []);

  useEffect(() => {
    if(authToken===''){ //check if authToken is empty string
      return;
    }else{
      fetchChatHistory(authToken);
    }
  }, [selectedModel])

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
        {/* <button onClick={handleNewChat} className="new-chat-button">New Chat</button> */}

      </div>

      <main>
        <div className='view'>
          <div className="model-selector">
   
            {Object.values(AIModel).map(model => (
              <button 
                key={model} 
                className={selectedModel === model ? 'selected' : ''}
                onClick={() => setSelectedModel(model as AIModel)}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      
      <div className="view chat-window">

          <div className="chat-history">
            {chatHistory.map((item, index) => (
              <div key={index} className="chat-message">{item.content}</div>
            ))}

          </div>

        {/* <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="input-bar"
          />
          <button onClick={handleSendClick} className="send-button">Send</button>
        </div> */}
      </div>

      <div id="message-form">
            <div className="message-wrapper">
                <input id="message" placeholder="Send a message" value={inputText} onChange={handleInputChange}/>
                <button className="send-button" onClick={handleSendClick}>
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32" id="send"><path d="M31.48959,2.90819c-0.03976-1.04205-1.19317-1.68439-2.12529-1.26078C29.36432,1.64735,1.34714,14.91867,1.34714,14.91867c-1.03748,0.4537-1.15173,2.02162-0.17779,2.61244c-0.00006,0,6.56647,4.29322,6.56647,4.29322v7.16302c-0.03842,1.29145,1.66795,2.01355,2.56215,1.06113c-0.00003,0.00007,3.96029-3.95982,3.96029-3.95982s5.54258,3.62374,5.54258,3.62374c0.24722,0.16172,0.53353,0.24478,0.82179,0.24478c0.61638,0.00498,1.2002-0.39932,1.40809-0.98157c0,0.00001,9.38467-25.45261,9.38467-25.45261C31.48575,3.3223,31.51829,3.11498,31.48959,2.90819z M22.81887,8.06956L10.70725,20.18081l-5.65374-3.69624L22.81887,8.06956z M10.73767,25.36404V23.7869l0.95377,0.62355L10.73767,25.36404z M19.86631,26.16873l-6.5923-4.30983L26.23356,8.89966L19.86631,26.16873z"></path></svg>
                </button>
            </div>
        </div>
    </main>
    
    </div>
    </>
  );
};

export default ChatInterface;