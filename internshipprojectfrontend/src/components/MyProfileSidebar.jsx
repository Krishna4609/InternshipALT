import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function MyProfileSidebar() {

    const navigate = useNavigate()

    const [currentUser,setCurrentUser] = useState([])

    async function handleCurrentUser(){
        const loggedInUser = localStorage.getItem("sessionToken")
        try {
            const response = await axios.get('http://localhost:8080/users/' + loggedInUser + '/getUser')
            setCurrentUser(response.data)
        } catch (error) {
            console.log("error")
        }
    }

    useEffect(()=>{
        handleCurrentUser()
    },[])
    return ( 
        <>
        <div className='container'>
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
            <a className="menu-item active" onClick={e=>{navigate('/home')}} >
                <span><i className="uil uil-home"></i></span> <h3>Home</h3>
            </a>
            <a className="menu-item " onClick={e=>{
                navigate('/home/mydetails')
            }}>
                <span><i className="uil uil-compass"></i></span> <h3>MyDetails</h3>
            </a>
            <a className="menu-item "onClick={e=>{navigate('/home/address')}} >
                <span><i className="uil uil-compass"></i></span> <h3>Address</h3>
            </a>
            <a className="menu-item " onClick={e=>{navigate('/home/education')}} >
                <span><i className="uil uil-compass"></i></span> <h3>Education</h3>
            </a>
            <a className="menu-item " onClick={e=>{navigate('/home/skills')}} >
                <span><i className="uil uil-compass"></i></span> <h3>Skills</h3>
            </a>
        </div>
        </div>
        </div>
        </>
     );
}

export default MyProfileSidebar;