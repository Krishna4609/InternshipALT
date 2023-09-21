import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/main.css";
import "../styles/mypost.css";

import MyProfileSidebar from "./MyProfileSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likesCount, setLikesCount] = useState({}); // State for storing like counts

  const loggedInUser = localStorage.getItem("sessionToken");

  async function fetchPosts() {
    try {
      const response = await axios.get("http://localhost:8080/post/getPosts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch like counts for each post
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

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchLikeCounts();
    }
  }, [posts]);

  async function handleDelete(post_id) {
    try {
      await axios.delete(`http://localhost:8080/post/delete/${post_id}`);
      navigate("/home/myprofile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="stylePost-container">
          <MyProfileSidebar />
          <div className="myPost-container">
            <h2>My Posts</h2>
            <div className="post-container">
              {posts.map((post) => {
                if (post.user_id == loggedInUser) {
                  return (
                    <>
                      <div key={post.post_id} className="post">
                        {post.base64Content && (
                          <div className="post-image-container">
                            <img
                              className="post-image"
                              src={`data:image/png;base64,${post.base64Content}`}
                              alt={`Post Image ${post.post_id}`}
                            />
                          </div>
                        )}
                        <p className="post-caption">Caption: {post.descr}</p>
                        <p className="post-likes">
                          Likes: {likesCount[post.post_id] || 0}
                        </p>
                        <button
                          className="delete-post"
                          onClick={() => handleDelete(post.post_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyProfile;
