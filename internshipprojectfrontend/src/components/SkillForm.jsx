import axios from "axios";
import React, { useState } from "react";
import "../styles/skillForm.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import MyProfileSidebar from "./MyProfileSidebar";

const SkillForm = () => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const user_id = localStorage.getItem("sessionToken");
    await axios
      .post(`http://localhost:8080/skill/${user_id}/addSkill`, formData)
      .then(() => {
        setFormData({
          skillType: "",
          skillName: "",
          proficiency: "",
        });
        navigate("/home/skills");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [formData, setFormData] = useState({
    skillType: "",
    skillName: "",
    proficiency: "",
  });

  return (
    <>
      <Navbar />
      <main>
        <div className="myeditSkillcontainer">
          <MyProfileSidebar />
          <div className="centered-container">
            <div className="skill-form-container">
              <h2 className="form-heading">Add New Skill</h2>
              <form onSubmit={handleSubmit} className="skill-form">
                <div className="form-group">
                  <label htmlFor="skillType" className="form-label">
                    Skill Type:
                  </label>
                  <input
                    type="text"
                    id="skillType"
                    name="skillType"
                    value={formData.skillType}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skillName" className="form-label">
                    Skill Name:
                  </label>
                  <input
                    type="text"
                    id="skillName"
                    name="skillName"
                    value={formData.skillName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="proficiency" className="form-label">
                    Proficiency Level:
                  </label>
                  <select
                    id="proficiency"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Proficiency Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <button type="submit" className="submit-button">
                  Add Skill
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SkillForm;
