import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import "../styles/skill.css";
import MyProfileSidebar from "./MyProfileSidebar";

const Skill = () => {
  const loggedInUser = localStorage.getItem("sessionToken");
  const navigate = useNavigate();

  function handleAddSkill() {
    navigate("/home/skills/skillform");
  }

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/skill/allSkill")
      .then((response) => {
        console.log(skills);
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  const handleDeleteSkill = async (skill_id) => {
    try {
      await axios.delete(`http://localhost:8080/skill/delete/${skill_id}`);
      // Remove the deleted skill from the skills state
      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.skill_id !== skill_id)
      );
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <>
      <Navbar/>
      <main>
      <div className="mycontainer">
      <MyProfileSidebar/>
      <div className="skill-container">
        <div className="header">
          <h2>Skills</h2>
        </div>
        <div className="content">
          <div className="section-header">
            <h2>Skill Details</h2>
            <button className="add-skill-button" onClick={handleAddSkill}>
              Add New Skill
            </button>
          </div>

          {skills.length > 0 ? ( 
            <table className="skill-table">
              <thead>
                <tr>
                  <th>Sl.no</th>
                  <th>Skill Type</th>
                  <th>Skill Name</th>
                  <th>Proficiency</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, index) => {
                  if (skill.userProfile.user_id === parseInt(loggedInUser)) {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{skill.skillType}</td>
                        <td>{skill.skillName}</td>
                        <td>{skill.proficiency}</td>
                        <td>
                          <Link
                            className="editbtn"
                            to={`/home/skills/editskill/${skill.skill_id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="deletebtn"
                            onClick={() => handleDeleteSkill(skill.skill_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          ) : (
            <p>No skills found.</p>
          )}
        </div>
      </div>
      </div>
      </main>
    </>
  );
};

export default Skill;
