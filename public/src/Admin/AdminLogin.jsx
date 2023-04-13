import React,{useState} from 'react'
import { toast} from 'react-toastify'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginComponenet from '../Componenets/LoginComponenet'
function Login() {
    const navigate = useNavigate()
    const [value,setValue] = useState({
        email:'',
        password:''
    })
const generateError = (err) => toast.error(err,{
    position:'bottom-right'
})

    const handlesubmit = async (e)=>{
        e.preventDefault()
        try {
         const {data} = await axios.post('http://localhost:4000/adminlogin',{
             ...value
         },
         {withCredentials: true})

         if(data.errors){
           const {email,password} =  data.errors
           if(email){ 
            generateError(email)}
           else if (password){ 
            generateError(password)} 
           else{
           }
         }else{            
            navigate('/admin');
         }

        } catch (error) {
         console.log(error.message);
        }
         }
 
  return (
   <LoginComponenet  
    handlesubmit={handlesubmit}
    setValue={setValue} 
    value={value}
    />
  )
}

export default Login
