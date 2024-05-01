"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './page.css'
import { Navbar } from '../../components/Navbar';
function ImageComponent() {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/generate-images', { //http://localhost:5000/generate-images
        prompt: prompt,
        negative_prompt: prompt
        // Using the same prompt as negative_prompt for this example
      });
      const data = response.data;
      setImages(data.images)
      setLoading(false);
      //setImages(data.images);
      console.log(response)
    } catch (error) {
      setLoading(false);
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
    <>
    <Navbar/>
    <div className='container_div'>
    {loading && <div className='text-white'>Loading...</div>}
      <div className='image_div'>
        {!loading&&images.map((imageData, index) => (
          <img className='inner_image_div'
            key={index}
            src={`data:image/jpeg;base64,${imageData}`}
            alt={`Image ${index}`}
            width={512}
            height={512}
          />
        ))}
      </div>
      <div className='input_div'>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter prompt"
          className='text-black'
        />
        <button onClick={handleButtonClick}>Send</button>
      </div>
      
    </div>
    </>
  );
}

export default ImageComponent;
