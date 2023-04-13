import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Admin/User.css';
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";



function Users() {
  const [value, setEdit] = useState({
    email: '',
    phone: '',
    id: ''
  })
  const [cookies, setCookie, removeCookie] = useCookies([])
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {


    const veryfyUser = () => {

      if (!cookies.jwt) {

        navigate('/adminlogin')
      } else {

        axios.get('http://localhost:4000/admin', {})
          .then((result) => {

            if (!result.status) {

              removeCookie('jwt')
              navigate('/adminlogin')
            } else {

              setUsers(result.data.data);
            }

          }

          );
      }
    }
    veryfyUser()



  }, [cookies, navigate, removeCookie ,value]);

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:4000/edit-user', {
      ...value
    }).then((response) => {

      if (response.data.status) {

        toast.success(response.data.message, {
          position: "top-center",
        })
        setEdit({
          email: '',
          email: '',
          id: ''

        })
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  function deleteUser(id) {

    axios.delete(`http://localhost:4000/admin/delete-user/${id}`, {
      withCredentials: true,
    }).then((response) => {
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-center",
        });
        getUserList();
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
    });
  }

  const getUserList = () => {
    axios.get('http://localhost:4000/admin', {})
      .then((result) => {
        setUsers(result.data.data);
      })
  }
  const handleChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredUsers = users?.filter((user) => {
    const searchWords = searchQuery.split(' ');
    for (let i = 0; i < searchWords.length; i++) {
      if (
        !Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(searchWords[i])
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className='test'>
      <button id='addUser' onClick={() => {
        navigate('/add-user')
      }}>Add user</button>
      <button id='logouts' onClick={() => {
        removeCookie('jwt')
        navigate('/login')
      }}>Log out</button>
      {value.email || value.password || value.id ? null : <input type="text" onChange={handleChange} placeholder='Search..' />}
      {value.email || value.password || value.id ? <span className='adminHome' onClick={()=>{
        setEdit({
          email:'',
          password:'',
          id:''
        })
      }}>Home</span> : null}
      {value.email || value.password || value.id ? <div className='addUser'>
        <form onSubmit={(e) => {
          handleSubmit(e)
        }} >
          <span onClick={() => {
            setEdit({
              email: '',
              password: '',
              id: ''
            })
          }} id='close'>x</span>
          <h2>Edit User</h2>

          <label htmlFor="">email</label>

          <input
            onChange={(e) => {
              setEdit({
                [e.target.name]: e.target.value,
                phone: value.phone,
                id: value.id
              })
            }} value={value.email} type="email" name='email' /> <br />
          <label htmlFor="">Phone</label>
          <input
            onChange={(e) => {
              setEdit({
                [e.target.name]: e.target.value,
                email: value.email,
                id: value.id
              })
            }} value={value.phone} type="text" name='phone' />  <br />


          <div className='sub-btn'>  <button type='submit'>Edit</button> </div>
        </form>
        <ToastContainer />
      </div> :

        <table className='table'>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><button className='editUser' onClick={() => {
                  setEdit({
                    email: user.email,
                    phone: user.phone,
                    id: user._id
                  })
                }} >edit</button> <button className='userDelete' onClick={() => {
                  deleteUser(user._id)
                }}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <ToastContainer />
    </div>
  );
}

export default Users;
