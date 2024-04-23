"use client"
import React, { useState } from 'react';
import axios from 'axios';

function ImageComponent() {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState('');

  const fetchImages = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-images', {
        prompt: prompt,
        negative_prompt: prompt // Using the same prompt as negative_prompt for this example
      });
      const data = response.data;
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = () => {
    fetchImages();
  };

  return (
    <div className='bg-white h-screen'>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter prompt"
          className="text-black bg-blue-900 p-10"
        />
        <button onClick={handleButtonClick} className="bg-red-900 p-3 ">Send</button>
      </div>
      <div>
        {images.map((imageData, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${imageData}`}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageComponent;
