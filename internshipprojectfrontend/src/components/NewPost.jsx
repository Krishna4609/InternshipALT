import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewPost.css";
import Navbar from "./Navbar";
import axios from "axios";
import Sidebar from "./Sidebar";

function NewPost() {
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("sessionToken")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("post_date", new Date());
    formData.append("descr", description);
    let user = localStorage.getItem("sessionToken");
    try {
      await axios.post(
        "http://localhost:8080/post/" + user + "/postupload",
        formData
      );
      navigate('/home/myprofile')
    } catch (error) {
      console.log("Failed     " + error);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="newPostContainer">
          <Sidebar />
          <form
            onSubmit={handleSubmit}
            className="post-form-container"
            action=""
          >
            <h1 className="post-form-head">Post your Ideas!</h1>
            <input
              type="file"
              className="image-input"
              onChange={(e) => setContent(e.target.files[0])}
            />
            <input
              type="text"
              name=""
              id=""
              className="caption"
              placeholder="Caption"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="post-upload">
              Upload
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default NewPost;
