import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/otherPost.css";
import { Helmet } from "react-helmet";

function OtherProfile() {
  const { user_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const loggedUser = localStorage.getItem("sessionToken")

  async function handleConnect(){
    try {
      const response = await axios.post(`http://localhost:8080/connection/send`,{
        userId: user_id,
        requestedUser_id: loggedUser
      })
      console.log("ha")
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchLikeCounts() {
    try {
      const likeCounts = {};
      for (const post of posts) {
        const res = await axios.get(
          `http://localhost:8080/${post.post_id}/totalLikes`
        );
        likeCounts[post.post_id] = res.data;
      }
      setLikesCount(likeCounts);
    } catch (error) {
      console.error("Error fetching like counts:", error);
    }
  }

  async function fetchPostsUser() {
    try {
      const postResponse = await axios.get(
        `http://localhost:8080/post/${user_id}/getPost`
      );
      setPosts(postResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPostsUser();
  }, [user_id]);

  useEffect(() => {
    if (posts.length > 0) {
      fetchLikeCounts();
    }
  }, [posts]);

  return (
    <>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/64d58efce2.js"
          crossorigin="anonymous"
        />
      </Helmet>
      <Navbar />
      <main>
        <div>
          <div className="stylePost-container">
            <Sidebar />
            <div className="myPost-container">
              <div className="post-container1">
                <div className="request-container">
                  <button onClick={handleConnect}>
                    +<i className="fas fa-solid fa-user"></i>Connect
                  </button>
                </div>
                <h2>Posts</h2>
                <div className="post-list">
                  {posts.map((post) => (
                    <>
                      <div key={post.post_id} className="post-image-container1">
                        <img
                          className="post-image"
                          src={`data:image/png;base64,${post.base64Content}`}
                          alt={`Post ${post.post_id}`}
                        />
                        <p>Caption: {post.descr}</p>
                        <p className="post-likes">
                          Likes: {likesCount[post.post_id] || 0}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default OtherProfile;
