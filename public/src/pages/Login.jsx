import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginComponenet from "../Componenets/LoginComponenet";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/userSlice";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("gooo")
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...value,
        },
        {
          withCredentials: true,
        }
      );

      if (data.errors) {
        const { email, password } = data.errors;
        if (email) {
          generateError(email);
        } else if (password) {
          generateError(password);
        } else {
        }
      } else {
        console.log("on elseeee")
        dispatch(
          setUserDetails({
            id: data.user._id,
            email: data.user.email,
            phone: data.user.phone,
            image: "",
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <LoginComponenet
      handleSubmit={handleSubmit}
      setValue={setValue}
      value={value}
    />
  );
}

export default Login;
