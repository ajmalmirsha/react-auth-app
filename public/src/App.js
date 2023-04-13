import React from "react";
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import 'react-toastify/dist/ReactToastify.css'
import Users from "./Admin/Users";
import  AdminLogin  from "./Admin/AdminLogin";
import AddUser from "./pages/AddUser";

import ProfilePage from "./pages/ProfilePage";


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route  exact path="/register" element={<Register/>} />
      <Route  exact path="/login" element={<Login/>} />
      <Route  exact path="/" element={<Home/>} />
      <Route  exact path="/admin" element={<Users/>} />
      <Route  exact path="/adminlogin" element={<AdminLogin/>} />
      <Route  exact path="/profile" element={<ProfilePage/>} />
      <Route  exact path="/add-user" element={<AddUser/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
