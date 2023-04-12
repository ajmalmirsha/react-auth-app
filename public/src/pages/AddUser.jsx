import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import './addUser.css'
function AddUser() {
    const [value,setValue] = useState({
        email:'',
        phone:'',
        password:''
    })
    const navigate = useNavigate()
    const generateError = (err) => toast.error(err,{
        position:'bottom-right'
    })
    const handlesubmit = async (e)=>{
        console.log('reached handle submit');

        e.preventDefault()
        try {
          
            console.log("inside try");
         const {data} = await axios.post('http://localhost:4000/register',{
             ...value
         },
         {withCredentials: true})

          console.log('haaai');
         console.log(data);
         if(data.errors){
            console.log('data has error');
           const {email,password,phone} =  data.errors
           if(email){ 
            console.log("email");
            generateError(email)}
           else if (phone){ 
       
            generateError(phone)}
           else if (password){
           
             generateError(password)}
           else{
           }
         }else{
            console.log("on navigaet else");
            setValue({
                email:'',
                phone:'',
                password:''
            })
            toast.success('created user', {
                position: "top-center",
              });
         }

        } catch (error) {
         console.log(error.message);
        }
         }
  return (
    <div className='addUser'>
      <form  onSubmit={(e)=>{
   handlesubmit(e)
      }} >
        <h2>Add User</h2>
        <label htmlFor="">email</label>
        <input 
            onChange={(e)=>{
            setValue({...value,[e.target.name]:e.target.value})
            }} value={value.email} type="email" name='email' /> <br />
        <label htmlFor="">Phone</label>
        <input 
            onChange={(e)=>{
            setValue({...value,[e.target.name]:e.target.value})
            }} value={value.phone} type="text" name='phone' />  <br />
        <label htmlFor="">Password</label>
        <input 
            onChange={(e)=>{
            setValue({...value,[e.target.name]:e.target.value})
            }} value={value.password} type="password" name='password' /> <br />
   
    <div className='sub-btn'>  <button type='submit'>create</button> </div>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddUser
