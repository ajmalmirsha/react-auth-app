import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'
function Register() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value,setValue] = useState({
        email:'',
        phone:'',
        password:''
    })
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
            console.log("on navigaet else",data);
            
            dispatch(
              setUserDetails({
                  id:data.user._id,
                  email:data.user.email,
                  phone:data.user.phone,
                  image:''
              })
          )
            navigate('/')
         }

        } catch (error) {
         console.log(error.message);
        }
         }

  return (
    <div className='top'>
    <div className="container">
      <h2 className='h2'>Register Account</h2>
      <form className='form' onSubmit={(e)=>{
        handlesubmit(e)
      }} >
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
          <label htmlFor="password">Phone</label>
          <input
          className='input'
            type="text"
            placeholder="Phone"
            name="phone"
           
            onChange={(e)=>{
            setValue({...value,[e.target.name]:e.target.value})
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
          className='input'
            type="password"
            placeholder="Password"
            name="password"
           
            onChange={(e)=>{
            setValue({...value,[e.target.name]:e.target.value})
            }}
          />
        </div>
        
       
        <button className='button' type="submit">Submit</button>
        <span className='span'>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default Register
