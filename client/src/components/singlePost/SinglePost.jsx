import React from 'react'
import './singlepost.css'
import { useLocation } from 'react-router' 
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../../context/Context';

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
        const res = await axios.get('/posts/' + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
    }

    getPost();
  }, [path])

  const { user } = useContext(Context);
  const PF = 'http://localhost:5000/images/'
   
  const handleDelete = async () => {
    try {
        await axios.delete(`/posts/${post._id}`, {
            data: {username: user.username}
        });
        window.location.replace('/');
    } catch(err) {}
  }

  const handleUpdate = async () => {
    try{
        await axios.put(`/posts/${post._id}`, {
            username: user.username, title, desc
        });
        setUpdateMode(false);
    }catch(err) {}
  }

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {post.photo && (
                <img 
                    src={PF + post.photo} 
                    alt="" 
                    className="singlePostImg" 
                />
            )}
            
            { updateMode ? <input type="text" value={title} className='singlePostTitleInput' onChange = {(event) => setTitle(event.target.value)} autofocus='true'/> : (
                <h1 className="singlePostTitle"> 
                    {title}
                    {post.username === user?.username && 
                        <div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-solid fa-trash-can" onClick = {handleDelete}></i>
                        </div>
                    }
                </h1>
            )}

            <div className="singlePostInfo">
                <span className='singlePostAuthor'>
                    Author: <b> <Link to={`/?user=${post.username}`} className='link'> { post.username } </Link> </b>
                </span>    
                <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>

            {updateMode ? <textarea value={desc} className='singlePostDescInput'  onChange = {(event) => setDesc(event.target.value)}/> : (
                <p className='singlePostDesc'>
                    {desc}
                </p>
            )}
            
            {updateMode && 
            <button className="singlePostButton" onClick={handleUpdate}> Update </button>
            }
        </div>
    </div>
  )
}

export default SinglePost
