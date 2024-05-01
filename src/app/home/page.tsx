"use client"
import Image from "next/image";
import Link from 'next/link';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Navbar } from "../../components/Navbar";
import './page.css'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState('');
  const [logged, setloggedIn] = useState('');
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      router.push('/login')
    }else{
      router.push('/home')
    }
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get('http://localhost:5000/getuser', {
            headers: {
              Authorization: `${token}`
            }
          });

          setUsername(response.data.user_name);
          console.log(response)
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
   
    <main className="main-container">
      <div className="navbar-space"><Navbar/></div>
      <div className="welcome-container">
        {username && <p className="welcome-message">Welcome, {username}!</p>}
      </div>
      
      <div className="logo-container">
        <Image
          className="logo-image"
          src="/logo.png"
          alt="FusionGPT Logo"
          width={220}
          height={37}
          priority
        />
      </div>

      <div className="links-container">
        <Link href="/textCompletion" className="link-item">
          <h2 className="link-title">Text Completion Models -&gt;</h2>
          <p className="link-description">Generate text by giving a prompt</p>
        </Link>

        <Link href="/textSummary" className="link-item">
          <h2 className="link-title">Text Summarization -&gt;</h2>
          <p className="link-description">Condense text to key points efficiently</p>
        </Link>

        <Link href="/getimage" className="link-item">
          <h2 className="link-title">Text to Image Models -&gt;</h2>
          <p className="link-description">Generate images from textual descriptions</p>
        </Link>

        <Link href="/ktuText" className="link-item">
          <h2 className="link-title">KTU Based Model -&gt;</h2>
          <p className="link-description">Get KTU syllabus oriented answers</p>
        </Link>

      </div>
    </main>
  );
}
