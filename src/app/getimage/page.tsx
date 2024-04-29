"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './page.css'

function ImageComponent() {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState('');

  const fetchImages = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-images', { //http://localhost:5000/generate-images
        prompt: prompt,
        negative_prompt: prompt // Using the same prompt as negative_prompt for this example
      });
      const data = response.data;
      setImages([...images, data.image])
      //setImages(data.images);
      console.log(response)
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
    <div className='container_div'>
      <div className='image_div'>
        {/* {images.map((imageData, index) => (
          <img className='inner_image_div'
            key={index}
            src={`data:image/jpeg;base64,${imageData}`}
            alt={`Image ${index}`}
          />
        ))} */}

        <img src='https://fastly.picsum.photos/id/562/200/300.jpg?hmac=hpXw5M2jimIlA8mbmOszsyQ8e8ZBdyiCeb9T-8STe44'></img>
        <img src='https://fastly.picsum.photos/id/562/200/300.jpg?hmac=hpXw5M2jimIlA8mbmOszsyQ8e8ZBdyiCeb9T-8STe44'></img>
      </div>
      <div className='input_div'>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter prompt"
        />
        <button onClick={handleButtonClick}>Send</button>
      </div>
      
    </div>
  );
}

export default ImageComponent;
