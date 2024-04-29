"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';

enum AIModel {
  palm2 = "Palm2",
  openai = "GPT3.5",
  llama2 = "Llama2"
}

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.palm2);
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
      const chatMessages = response.data.messages.map((message: any) => {
        return `${message.role}: ${message.content}`;
      });
      setChatHistory(chatMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendClick = async () => {
    if (inputText.trim() !== '') {
      const userMessage = `You: ${inputText}`;
      const assistantResponse = await fetchResponseFromAI(inputText, selectedModel);
      const updatedChatHistory = [...chatHistory, userMessage, `Assistant: ${assistantResponse}`];
      setChatHistory(updatedChatHistory);
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

  const fetchResponseFromAI = async (input: string, selectedModel: AIModel): Promise<string> => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', {
        messages: [{ role: 'user', content: input }],
        model_name: selectedModel
      }, { headers: { "Authorization": authToken } });
      const responseData = response.data;
      const assistantMessage = responseData.messages.find((message: any) => message.role === 'assistant');
      return assistantMessage ? assistantMessage.content : 'No response from assistant';
    } catch (error) {
      console.error('Error fetching response from AI:', error);
      return 'Sorry, could you ask me again?';
    }
  };

  return (
    <div className="chat-interface">
      <div className="sidebar">
        <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
        {/* Previous chats */}
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div key={index} className="chat-message">{message}</div>
          ))}
        </div>
      </div>
      <div className="chat-window">
        <div className="input-container">
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






// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './page.css';

// enum AIModel {
//   palm2 = "Palm2",
//   openai = "GPT3.5",
//   llama2 = "Llama2"
// }

// const ChatInterface: React.FC = () => {
//   const [inputText, setInputText] = useState<string>('');
//   const [chatHistory, setChatHistory] = useState<string[]>([]);
//   const [selectedModel, setSelectedModel] = useState<AIModel>(AIModel.palm2);
//   const [authToken, setAuthToken] = useState<string>('');

//   useEffect(() => {
//     setAuthToken(localStorage.getItem("token"))
//     return () => {
//     };
//   }, []);

//   const fetchResponseFromAI = async (input: string, selectedModel: AIModel): Promise<string> => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/chat', {
//         prompt: input,
//         model_name: selectedModel
//       },{ headers: {"Authorization" : authToken} });
//       console.log(response)
//       return response.data.response; 
//     } catch (error) {
//       console.error('Error fetching response from AI:', error);
//       return 'Sorry, could you ask me again?'; 
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(event.target.value);
//   };

//   const handleSendClick = async () => {
//     if (inputText.trim() !== '') {
//       setChatHistory(prevChat => [...prevChat, inputText]);
//       const response = await fetchResponseFromAI(inputText, selectedModel);
//       setChatHistory(prevChat => [...prevChat, response]);
//       setInputText('');
//     }
//   };
  

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       handleSendClick();
//     }
//   };

//   const handleNewChat = () => {
//     setChatHistory([]);
//   };

//   return (
//     <div className="chat-interface">
//       <div className="sidebar">
//         <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
//         {/* Previous chats */}
//       </div>
//       <div className="chat-window">
//         {chatHistory.map((message, index) => {
//           if (message.startsWith('You: ')) {
//             return <InputMessage key={index} message={message} />;
//           } else {
//             return <ResponseMessage key={index} message={message} />;
//           }
//         })}

//         <div className="input-container">
//           <input
//             type="text"
//             value={inputText}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//             className="input-bar"
//           />
//           <button onClick={handleSendClick} className="send-button">Send</button>
//         </div>
//       </div>
//       <div className="ai-model-dropdown">
//         <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value as AIModel)}>
//           {Object.values(AIModel).map(model => (
//             <option key={model} value={model}>{model}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// interface MessageProps {
//   message: string;
// }

// const InputMessage: React.FC<MessageProps> = ({ message }) => {
//   return (
//     <div className="message user-message">
//       {message}
//     </div>
//   );
// };

// const ResponseMessage: React.FC<MessageProps> = ({ message }) => {
//   return (
//     <div className="message response-message">
//       {message}
//     </div>
//   );
// };

// export default ChatInterface;
