import React, { useEffect, useState } from "react";
import "../styles/main.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Right from "./Right";

function Main() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const loggedInUser = localStorage.getItem("sessionToken");
  const [likesCount, setLikesCount] = useState({});
  const [commentResponse, setCommentResponse] = useState({});
  const [showAllComments, setShowAllComments] = useState({}); // Store showAllComments state per post

  async function handleLike(post_id, user_id) {
    try {
      await axios.post("http://localhost:8080/like", {
        post_id: post_id,
        user_id: user_id,
      });
      const res = await axios.get(
        "http://localhost:8080/" + post_id + "/totalLikes"
      );
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [post_id]: res.data,
      }));
    } catch (error) {
      console.error(error);
    }
  }
  const handleFeed = async () => {
    try {
      const response = await axios.get("http://localhost:8080/post/getPosts");
      setPosts(response.data)
      console.log(response.data)
      
    } catch (error) {
      console.error(error);
    }
  };

  async function handleComments(post_id) {
    try {
      const response = await axios.post(
        "http://localhost:8080/post/" + loggedInUser + "/postComment",
        {
          post_id: post_id,
          comment_text: comment,
        }
      );
      setComment("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  const handleUser = async () => {
    try {
      const currentUserResponse = await axios.get(
        "http://localhost:8080/users/" + loggedInUser + "/getUser"
      );
      setCurrentUser(currentUserResponse.data);
      const userResponse = await axios.get(
        "http://localhost:8080/users/fetchAllUsers"
      );
      setUsers(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentResponse = await axios.get(
        "http://localhost:8080/post/getComments"
      );
      setCommentResponse(commentResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleTotalLikes(post_id) {
    try {
      const res = await axios.get(
        "http://localhost:8080/" + post_id + "/totalLikes"
      );
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [post_id]: res.data,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleFeed();
    handleUser();
    fetchComments();
    handleLike();
  }, []);

  useEffect(()=>{
    handleTotalLikes();
  },[likesCount])

  return (
    <>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/64d58efce2.js"
          crossorigin="anonymous"
        />
      </Helmet>
      <div className="middle">
        {users.map((user, userIndex) => (
          <div className="feeds" key={userIndex}>
            {posts.map((feed, feedIndex) => {
              if (
                feed.user_id !== currentUser.user_id &&
                feed.user_id === user.user_id
              ) {
                const commentsForFeed = commentResponse.filter(
                  (comment) => comment.post_id === feed.post_id
                );

                return (
                  <div className="feed" key={feedIndex}>
                    <Link to={`/home/profile/${user.user_id}`}>
                      <h3>{user.firstname}'s Post</h3>
                    </Link>
                    <div className="head">Posted on {feed.post_date}</div>
                    <div className="user">
                      <div className="profile-pic">
                        <img src="images/profile-14.jpg" alt="" />
                      </div>
                      <div className="info">
                        <h3>
                          {user.firstname} {user.lastname}
                        </h3>
                      </div>
                      <span className="edit">
                        <i className="uil uil-ellipsis-h"></i>
                      </span>
                    </div>
                    <div className="photo">
                      <img
                        src={`data:image/png;base64,${feed.base64Content}`}
                      />
                    </div>
                    <div className="caption">
                      <p>
                        <span>{user.username}</span>:{feed.descr}
                      </p>
                    </div>
                    <div className="like-button">
                      <button
                        onClick={() => handleLike(feed.post_id, loggedInUser)}
                      >
                        ❤️
                      </button>
                      <span>{likesCount[feed.post_id]}</span>
                    </div>

                    <div className="comment-section">
                      <h4>Comments:</h4>
                      {commentsForFeed.length > 0 && (
                        <>
                          <div className="comment">
                            <p>
                              <span>
                                {users.find(
                                  (u) =>
                                    u.user_id ===
                                    commentsForFeed[0].user_id
                                )?.username}
                              </span>
                              :{commentsForFeed[0].comment_text}
                            </p>
                          </div>
                          {commentsForFeed.length > 1 &&
                            !showAllComments[feed.post_id] && (
                              <div
                                className="show-all-comments"
                                onClick={() =>
                                  setShowAllComments((prevState) => ({
                                    ...prevState,
                                    [feed.post_id]: true,
                                  }))
                                }
                              >
                                Show All Comments
                              </div>
                            )}
                          {showAllComments[feed.post_id] &&
                            commentsForFeed.slice(1).map((comment, index) => (
                              <div key={index} className="comment">
                                <p>
                                  <span>
                                    {users.find(
                                      (u) =>
                                        u.user_id === comment.user_id
                                    )?.username}
                                  </span>
                                  :{comment.comment_text}
                                </p>
                              </div>
                            ))}
                        </>
                      )}
                    </div>

                    <div className="comment">
                      <input
                        key={feedIndex}
                        value={comment}
                        type="text"
                        placeholder="Add a comment..."
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />

                      <i
                        className="fas fa-paper-plane comment-btn"
                        onClick={() => handleComments(feed.post_id)}
                      ></i>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
      <Right/>
    </>
  );
}

export default Main;
