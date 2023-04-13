import React from 'react'
import { useState } from 'react'
import './write.css'
import axios from 'axios'
import { useContext } from 'react';
import { Context } from '../../context/Context'

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
        username: user.username,
        title,
        desc
    }

    // setting up image detail:
    if(file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append('name', filename);
        data.append('file', file);
        newPost.photo = filename;

        try{
            await axios.post('/upload', data);
        }catch(err){}
    }

    try{
        const res = await axios.post('/posts', newPost);
        window.location.replace('/post/' + res.data._id)
    }catch(err){}
  }

  return (
    <div className='write'>
        {file && 
        <img 
            className="writeImg"
            src={URL.createObjectURL(file)} 
            alt="" 
        />
        }
        
        <form action="" className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input 
                    type="file" 
                    id='fileInput' 
                    style={{display: "none"}}
                    onChange = {(event) => setFile(event.target.files[0])}
                />
                <input 
                    type="text" 
                    placeholder='Title' 
                    className='writeInput' 
                    autoFocus
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className="writeFormGroup">
                <textarea 
                    placeholder='Tell Your Story'
                    type="text"
                    className='writeInput writeText'
                    onChange={(event) => setDesc(event.target.value)}
                ></textarea>
            </div>
            <button className="writeSubmit" type='submit'>Publish</button>
        </form>
      
    </div>
  )
}

export default Write
