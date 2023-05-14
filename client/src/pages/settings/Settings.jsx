import React, { useContext, useState } from 'react'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import axios from 'axios'
import { axiosBaseURL } from '../../utils/axiosBaseUrl'

function Settings() {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    setSuccess(false);
    event.preventDefault();
    dispatch({
      type: 'UPDATE_START'
    })

    const updatedUser = {
        userId: user._id,
        username,
        email,
        password
    }

    // setting up image detail:
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;

      try{
        await axiosBaseURL.post('upload', data);
      }catch(err){}
    }

    try{
      const res = await axiosBaseURL.put('users/' + user._id, updatedUser);
      setSuccess(true); // useState
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: res.data
      })
    }catch(err){
      console.log(err);
      dispatch({
        type: 'UPDATE_FAILURE'
      })
    }
  }

  const PF = 'https://aadiblogs.azurewebsites.net/images/';
  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label> Profile Picture </label>
          <div className="settingsPP">
            <img 
              src= {(file ? URL.createObjectURL(file) : PF + user.profilePic)} 
              alt="" 
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input 
              type="file" 
              id='fileInput' 
              style={{display: "none"}}
              onChange={(event) => setFile(event.target.files[0])}/>
          </div>
          <label> Username </label>
          <input 
            type="text" 
            value={username}
            onChange={(event) => setUsername(event.target.value)}  
          />
          <label> Email </label>
          <input 
            type="email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)}  
          />
          <label> Password </label>
          <input 
            type="password"
            onChange={(event) => setPassword(event.target.value)}  
          />
          <button className='settingsSubmit' type='submit'> Update </button>
          {success && <span style={{color: 'green', textAlign: 'center', paddingTop:'20px'}}>Profile has been Updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

export default Settings
