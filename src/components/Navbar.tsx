"use client"
import Link from 'next/link';
import './Navbar.css'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
export const Navbar =()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    return(
        <nav className='bg-gray-800 text-white p-4'>
    <div className="navbar">
        <div className="logo-name">FusionGPT</div>
        <div className="navbar-items flex gap-3">
            <Link href="/home">Home</Link>
             <div onClick={()=>{
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    router.push('/login')

             }}
             className='cursor-pointer hover:text-gray-400'
             >
                Logout
             </div>
        </div>
    </div>
</nav>
);
};