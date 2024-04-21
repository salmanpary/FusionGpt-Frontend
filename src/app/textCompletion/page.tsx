"use client"
import React, { useState } from 'react';
import axios from 'axios'; 
import './page.css';

enum AIModel {
  Gemini = "Gemini",
  GPT35 = "GPT3.5",
  Llama2 = "Llama2"
}

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.Gemini);

  const fetchResponseFromAI = async (input: string, selectedModel: AIModel): Promise<string> => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat-completion/gemini', {
        prompt: input,
        model: selectedModel
      });
      console.log(response)
      return response.data.response; 
    } catch (error) {
      console.error('Error fetching response from AI:', error);
      return 'Sorry, could you ask me again?'; 
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendClick = async () => {
    if (inputText.trim() !== '') {
      setChatHistory(prevChat => [...prevChat, inputText]);
      const response = await fetchResponseFromAI(inputText, selectedModel);
      setChatHistory(prevChat => [...prevChat, response]);
      setInputText('');
    }
  };
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleNewChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="chat-interface">
      <div className="sidebar">
        <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
        {/* Previous chats */}
      </div>
      <div className="chat-window">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.startsWith('You: ') ? 'message' : 'response-message'}>
            {message}
          </div>
        ))}

        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="input-bar"
        />
        <button onClick={handleSendClick} className="send-button">Send</button>
      </div>
      <div className="ai-model-dropdown">
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value as AIModel)}>
          {Object.values(AIModel).map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChatInterface;
