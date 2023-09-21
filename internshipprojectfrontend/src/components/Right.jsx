import React, { useEffect, useState } from "react";
import "../styles/main.css";
import axios from "axios";

function Right() {
  const loggedUser = localStorage.getItem("sessionToken");
  const [usernames, setUsernames] = useState({}); // State variable to store usernames

  async function handleAccept(requestedUser_id){
    try {
      const res = await axios.post(`http://localhost:8080/connection/accept`,{
        userId: loggedUser,
        connected_id:requestedUser_id
      })
      fetchRequests()
    } catch (error) {
      console.log(error)
    }
  }
  async function handleDecline(requestedUser_id){
    try {
      const res = await axios.post(`http://localhost:8080/connection/decline`,{
        userId: loggedUser,
        connected_id:requestedUser_id
      })
      fetchRequests()
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchRequests() {
    try {
      const response = await axios.get(
        `http://localhost:8080/connection/getRequest/${loggedUser}`
      );

      // Map requestedUser_id to usernames
      const usernamesMap = {};
      for (const request of response.data) {
        const userResponse = await axios.get(
          `http://localhost:8080/users/${request.requestedUser_id}/getUser`
        );
        usernamesMap[request.requestedUser_id] = userResponse.data.username;
      }

      setUsernames(usernamesMap); // Update the state with usernames
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []); // Make the request when the component mounts

  return (
    <div className="right">
      <div className="friend-requests">
        <h4>Requests</h4>
        {Object.keys(usernames).map((requestedUserId) => (
          <div className="request" key={requestedUserId}>
            <div className="info">
              <div className="profile-pic">
                <img src="images/profile-13.jpg" alt="" />
              </div>
              <div>
                <h5>{usernames[requestedUserId]}</h5>
              </div>
            </div>
            <div className="action">
              <button className="btn btn-primary" onClick={()=>handleAccept(requestedUserId)}>Accept</button>
              <button className="btn" onClick={()=>handleDecline(requestedUserId)}>Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Right;
