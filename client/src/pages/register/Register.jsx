import React from 'react'
import './register.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { axiosBaseURL } from '../../utils/axiosBaseUrl'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    try{  
      const res = await axiosBaseURL.post('auth/register', {
        username,
        email,
        password
      });

      // if we have logged in successfully, then we will be redirected to the login page
      res.data && window.location.replace('/login');
    }catch(err){
      setError(true);
    }
  }

  return (
    <div className='register'>
      <span className='registerTitle'> Register </span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label> Username </label>
        <input 
          className='registerInput' 
          type="text" 
          placeholder='Enter Your Username...' 
          onChange={(event) => setUsername(event.target.value)}
        />
        <label> Email </label>
        <input 
          className='registerInput' 
          type="email" 
          placeholder='Enter Your Email...' 
          onChange={(event) => setEmail(event.target.value)}
        />
        <label> Password </label>
        <input 
          className='registerInput' 
          type="password" 
          placeholder='Enter Your Password...'
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className='registerButton' type="submit"> Register </button>
      </form>
        <button className='registerLoginButton'> 
          <Link className='link' to="/login"> Login </Link>
        </button>
        {error && <span style={{color: "red", marginTop: "10px"}}> Something went Wrong! </span>}
    </div>
  )
}

export default Register
