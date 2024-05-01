"use client"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
export default function page(){
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      router.push('/login')
    }else{
      router.push('/home')
    }
  },[])
  return(
    <div>
      <h1>Redirecting...</h1>
    </div>
  )
}