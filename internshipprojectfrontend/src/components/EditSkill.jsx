import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/skillForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import MyProfileSidebar from "./MyProfileSidebar";

const EditSkill = () => {
  const navigate = useNavigate();
  const { skill_id } = useParams();
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
      .put(`http://localhost:8080/skill/update/${skill_id}`, formData)
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

  const loadSkill = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/skill/getSkill/${skill_id}`
      );
      setFormData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSkill();
  }, [skill_id]); // Reload the skill data when skill_id changes

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
              <h2 className="form-heading">Edit Skill</h2>
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
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default EditSkill;
