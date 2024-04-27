"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true); // State to track send button status
  const [sessionId, setSessionId] = useState(""); // State to store session ID
  const [currentMessage, setCurrentMessage] = useState(""); // State to store current message
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPdfFiles([...pdfFiles, ...files]);
  };

  const handleRemovePdf = (index) => {
    const updatedFiles = [...pdfFiles];
    updatedFiles.splice(index, 1);
    setPdfFiles(updatedFiles);
  };

  const handleSave = () => {
    const sessionId = uuidv4(); // Generate a random session ID
    const endpoint = `http://localhost:5000/save-documents`; // Endpoint URL
  
    const formData = new FormData();
    pdfFiles.forEach((file) => {
      formData.append("files[]", file);
    });
     setIsSendButtonDisabled(true); // Disable send button
    // Append session ID to form data
    setSessionId(sessionId); // Set session ID in state
    formData.append("sessionId", sessionId);
    axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setIsSendButtonDisabled(false); // Enable send button
      })
      .catch((error) => {
        console.error("Error saving documents:", error.message);
        alert("Failed to save documents");
      });
  };
  

  const handleMessageSend = (message) => {
    setMessages([...messages, { question: message, answer: '' }]); // Add user message to chat interface
  
    // Make a POST request to the server
    const endpoint = 'http://localhost:5000/chat-with-ktu'; // Endpoint URL
    const data = {
      session_id: sessionId, // Pass the session ID
      query: message // Pass the user's message as the query
    };
    setIsSendButtonDisabled(true); // Disable send button
    axios.post(endpoint, data)
      .then((response) => {
        console.log("Response:", response.data);
        const matches = response.data; // Assuming the response contains matches
        setMessages([...messages, { question: message, answer:matches }]); // Update chat interface with the response
        setIsSendButtonDisabled(false); // Enable send button
      })
      .catch((error) => {
        console.error("Error sending message:", error.message);
        alert("Failed to send message");
      });
  };
  

  return (
    <div className="p-10" style={{ backgroundColor: "black", color: "white" }}>
      <h1>KTU GPT</h1>
      <div>Chat with your textbooks with KTU GPT</div>
      <div className="p-10 flex">
        <div className="mr-10">
        <div>
            <h2 className="pb-4 text-xl">Upload PDFs</h2>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload" className="bg-blue-500 px-4 py-2 rounded-md cursor-pointer text-white">
              Choose Files
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              style={{ color: "white", opacity: 0, position: "absolute", zIndex: -1 }}
            />
          </div>

          {pdfFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg">Uploaded PDFs</h3>
              <ul className="mt-2">
                {pdfFiles.map((file, index) => (
                  <li key={index} className="flex items-center py-2">
                    <span className="text-white">{file.name}</span>
                    <button
                      onClick={() => handleRemovePdf(index)}
                      className="ml-4 bg-red-800 rounded-full px-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 5.293a1 1 0 0 1 1.414 1.414L10 11.414l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 1 1-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 12 5.293 8.707a1 1 0 0 1 0-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleSave}
                className="mt-4 bg-green-800 px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div>
          <div>
            <h2 className="pb-4 text-xl">Chat Interface</h2>
            {messages.length > 0 && (
              <div className="border border-gray-600 rounded-lg p-4 mb-4">
                {messages.map((message, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-2 mb-2">
                    <span className="text-white">{message.question}</span>
                    <span className="text-gray-400"> - {message.answer}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message"
                className="text-black flex-1 py-2 px-4 rounded-l-lg"
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
              />
              <button
                onClick={() => handleMessageSend(currentMessage)}
                className={`bg-blue-600 text-white px-4 py-2 rounded-r-lg ${isSendButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={isSendButtonDisabled}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
