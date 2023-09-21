import React from 'react'
import '../styles/main.css'
import {useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate()
    const handleLogout = e =>{
        localStorage.removeItem("sessionToken");
        navigate("/");
    }
    return ( 
        <>
         <nav>
            <div className="container">
                <h2 className="logo">First Step</h2>
                
                <div className="create">
                    <label className="btn btn-primary" htmlFor="create-post" onClick={handleLogout}>Logout</label>
                    <div className="profile-pic">
                        {/* <img src="images/profile-8.jpg" alt="pic 1" /> */}
                    </div>
                </div>
            </div>
        </nav>
        </>
     );
}

export default Navbar;