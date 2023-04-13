import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginComponenet from '../Componenets/LoginComponenet'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'

function Login() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    const generateError = (err) => toast.error(err, {
        position: 'bottom-right'
    })

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:4000/login', {
                ...value
            },
                { withCredentials: true })

            if (data.errors) {
                const { email, password } = data.errors
                if (email) {
                    generateError(email)
                }
                else if (password) {
                    generateError(password)
                }
                else {
                }
            } else {

                dispatch(
                    setUserDetails({
                        id: data.user._id,
                        email: data.user.email,
                        phone: data.user.phone,
                        image: ''
                    })
                )
                navigate('/')
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
