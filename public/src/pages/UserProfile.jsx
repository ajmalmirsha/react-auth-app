import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../pages/profile.css'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'
import { useCookies } from 'react-cookie'
function UserProfile() {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user);

  const navigate = useNavigate()
  const [image, setImage] = useState('')

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        userId: user.id
      },
      withCredentials: true,
    };

    if (image) {
      const { data } = await axios.post('http://localhost:4000/upload-image', formData, config)


      dispatch(
        setUserDetails({
          id: data.user._id,
          email: data.user.email,
          phone: data.user.phone,
          image: data.user.image
        })
      )
      setImage('')

    } else {
      setImage('')
      toast.error('only one will be accepted', {
        position: 'top-center'
      })
    }
  }



  return (
    <>
    <span className='adminHomes'  onClick={()=>{
      navigate('/')
    }}>Home</span>
      <button id='logouts' onClick={() => {
        removeCookie('jwt')
        navigate('/login')
      }}>Log out</button>
    <div className="propage">
     
      <h1>Profile Page</h1>

      <div className='proimage'>
        <img src={user.image ? process.env.PUBLIC_URL + `/image/${user.image}` : "data:image/png;base64,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"} alt="" />
        <form onSubmit={(e) => {
          uploadImage(e)
        }}>

          {image ? <button type='submit' className='imgUpload'  >submit</button> : <button type='submit' style={{ display: 'none' }}  >submit</button>}

          {image ? "" : <input type="file" id="file" name="image"
            onChange={(e) => {

              setImage(e.target.files[0])
            }} accept="image/*" />

          }
        </form>
      </div>
      <div className='prodata'>
        <h3>email : {user?.email}</h3>
        <h3>phone : {user?.phone}   </h3>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}

export default UserProfile
