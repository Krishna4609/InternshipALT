import React, { useEffect, useState } from 'react'
import '../styles/main.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
    const navigate = useNavigate()

    const handleTest = e =>{
        navigate('/home/test')
    }

    const handleMyposts = e =>{
        navigate('/home/myposts')
    }

    const handleNewPost = e =>{
        navigate('/home/newPost')
    }
    const loggedInUser = localStorage.getItem("sessionToken")
    const [currentUser,setCurrentUser]=useState([])

    const loadCurrentUser = async e=>{
        try {
            const response = await axios.get('http://localhost:8080/users/' + loggedInUser + '/getUser')
            setCurrentUser(response.data)
        } catch (error) {
            console.log("error")
        }
    }
    useEffect(()=>{
        loadCurrentUser()
    },[])
    return ( 
        <>
    <div className="left">
        <a className="profile">
            <div className="profile-pic">
                <img src="./images/profile-8.jpg" alt="" />
            </div>
            <div className="handle">
                <h4>{currentUser.firstname} {currentUser.lastname}</h4>
                <p className="text-muted">@ {currentUser.username}</p>
            </div>
        </a>
        <div className="sidebar">
            <a className="menu-item active" onClick={e=>{
                navigate('/home')
            }}>
                <span><i className="uil uil-home"></i></span> <h3>Home</h3>
            </a>
            <a className="menu-item " onClick={e=>{
                navigate('/home/myprofile')
            }}>
                <span><i className="uil uil-compass"></i></span> <h3>My Profile</h3>
            </a>
            {/* <a className="menu-item " onClick={e=>{
                navigate('/home/myconnections')
            }}>
                <span><i className="uil uil-compass"></i></span> <h3>My Connections</h3>
            </a> */}
            <label className="btn btn-primary" for="create-post" onClick={handleNewPost}>Create Post</label>
        </div>
    </div>
</>

     );
}

export default Sidebar;