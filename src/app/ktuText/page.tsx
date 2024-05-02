"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from '../../components/Navbar';
import { v4 as uuidv4 } from "uuid";
import './page.css';

const Page = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [processingPdf, setProcessingPdf] = useState(false);

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
    const sessionId = uuidv4();
    const endpoint = `http://localhost:5000/save-documents`;
    const formData = new FormData();
    pdfFiles.forEach((file) => {
      formData.append("files[]", file);
    });
    setIsSendButtonDisabled(true);
    setProcessingPdf(true); // Indicate processing PDF
    setSessionId(sessionId);
    formData.append("sessionId", sessionId);
    axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setIsSendButtonDisabled(false);
        setProcessingPdf(false); // PDF processed
      })
      .catch((error) => {
        console.error("Error saving documents:", error.message);
        alert("Failed to save documents");
      });
  };

  const handleMessageSend = (message) => {
    setMessages([...messages, { question: message, answer: '' }]);
    const endpoint = 'http://localhost:5000/chat-with-ktu';
    const data = {
      session_id: sessionId,
      query: message
    };
    setIsSendButtonDisabled(true);
    setCurrentMessage('')
    axios.post(endpoint, data)
      .then((response) => {
        console.log("Response:", response.data);
        const matches = response.data;
        setMessages([...messages, { question: message, answer: matches }]);
        setIsSendButtonDisabled(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error.message);
        alert("Failed to send message");
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-lg mb-2">KTU GPT</h1>
        {/* <div className="text-center mb-6">Chat with your textbooks with KTU GPT</div> */}
        <div className="upload-box flex flex-col items-center">
          <div className="mb-4">
            <h2 className="p-4">Upload PDFs</h2>
            <label htmlFor="file-upload" className="button mb-4">
              Choose Files
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {pdfFiles.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center">
              <ul className="">
                <div className="flex items-center">
                    <h3 className="mt-4 mb-4 ml-6">Uploaded PDFs</h3>
                    <button className="ml-2 -mt-2" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,300,150">
                      <g fill="#40c057" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(10.66667,10.66667)"><path d="M11.707,15.707c-0.195,0.195 -0.451,0.293 -0.707,0.293c-0.256,0 -0.512,-0.098 -0.707,-0.293l-4,-4c-0.391,-0.391 -0.391,-1.023 0,-1.414c0.391,-0.391 1.023,-0.391 1.414,0l3.293,3.293l8.35,-8.35c-1.827,-1.985 -4.439,-3.236 -7.35,-3.236c-5.523,0 -10,4.477 -10,10c0,5.523 4.477,10 10,10c5.523,0 10,-4.477 10,-10c0,-1.885 -0.531,-3.642 -1.438,-5.148z"></path></g></g>
                      </svg></button>
                </div>

                {pdfFiles.map((file, index) => (
                  <li key={index} className="file flex items-center py-2">
                    <span className="filename">{file.name}</span>
                    <button
                      onClick={() => handleRemovePdf(index)}
                      id="remove-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0,0,300,150">
                      <g fill="#fa5252" fill-rule="nonzero" stroke="none"  stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM16.414,15c0,0 3.139,3.139 3.293,3.293c0.391,0.391 0.391,1.024 0,1.414c-0.391,0.391 -1.024,0.391 -1.414,0c-0.154,-0.153 -3.293,-3.293 -3.293,-3.293c0,0 -3.139,3.139 -3.293,3.293c-0.391,0.391 -1.024,0.391 -1.414,0c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.153,-0.154 3.293,-3.293 3.293,-3.293c0,0 -3.139,-3.139 -3.293,-3.293c-0.391,-0.391 -0.391,-1.024 0,-1.414c0.391,-0.391 1.024,-0.391 1.414,0c0.154,0.153 3.293,3.293 3.293,3.293c0,0 3.139,-3.139 3.293,-3.293c0.391,-0.391 1.024,-0.391 1.414,0c0.391,0.391 0.391,1.024 0,1.414c-0.153,0.154 -3.293,3.293 -3.293,3.293z"></path></g></g>
                      </svg>
                    </button>
                  </li>
                ))}
              <button
                onClick={handleSave}
                className="save-button"
              >
                {processingPdf ? 'Processing PDF' : 'Save'}
              </button>
              </ul>
              </div>


            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl">Chat Interface</h2>
          <div className="chat-container">
            {messages.map((message, index) => (
              <div key={index} className="message mb-4">
                <span className="question">{message.question}</span>
                <span className="answer"> - {message.answer}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Type your message"
              className="chat-input"
              onChange={(e) => setCurrentMessage(e.target.value)}
              value={currentMessage}
            />
            <button
              onClick={() => handleMessageSend(currentMessage)}
              className={`send-button ${isSendButtonDisabled ? 'disabled' : ''}`}
              disabled={isSendButtonDisabled}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
