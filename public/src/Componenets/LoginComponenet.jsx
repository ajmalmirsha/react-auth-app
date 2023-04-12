import React,{useEffect, useState} from 'react'
import {ToastContainer , } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'



function LoginComponenet({handlesubmit,setValue,value}) {
  const [cookies,setCookie,removeCookie] = useCookies([])
  const navigate = useNavigate()
  useEffect(()=>{
    const veryfyUser = async ()=>{
       if(!cookies.jwt){
      navigate('/login')
       }else{
        console.log('cookies',cookies.jwt);
     const {data} = await axios.post('http://localhost:4000',{},{withCredentials:true})
     if(!data.status){
      removeCookie('jwt')
      navigate('/login')
     } else{
     console.log('elseeeeee');
       if(!data.user){
        console.log('user falsee');
        navigate('/admin')
       }else{
        console.log('user falsee');
        navigate('/')
       }
    
     }
       }
    }
    veryfyUser()
},[cookies,navigate,removeCookie])
  return (
    <div className='top'>
      <div className="container">
      <h2>Login to your Account</h2>
      <form className='form' onSubmit={(e)=>{
       handlesubmit(e)
      }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
          className='input'
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e)=>{
                setValue({...value,[e.target.name]:e.target.value})
            }}
            />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
          className='input'
            type="password"
            name="password"
            placeholder="password"
            onChange={(e)=>{
                setValue({...value,[e.target.name]:e.target.value})
            }}
            />
        </div>
       
        <button className='button' type="submit">Submit</button>
        <span className='span'>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default LoginComponenet
