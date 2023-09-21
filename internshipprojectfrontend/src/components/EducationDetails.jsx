import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/education-details.css"; // Import your CSS file
import MyProfileSidebar from "./MyProfileSidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function EducationDetailsPage() {
  const navigate = useNavigate();
  const [educationDetails, setEducationDetails] = useState({});
  const loggedInUserId = localStorage.getItem("sessionToken");

  useEffect(() => {
    async function fetchEducationDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/education/educationByUserId/${loggedInUserId}`
        );
        console.log(response.data)
        setEducationDetails(response.data);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    }

    if (loggedInUserId) {
      fetchEducationDetails();
    }
  }, [loggedInUserId]);

  const handleEditEducation = (education_id) => {
    console.log(education_id)
    navigate(`/home/education/editEducation/${education_id}`); 
  };

  const handleAddEducation = () => {
    navigate("/home/education/addEducation"); 
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDelete = async (education_id) => {
    try {
      await axios.delete(
        `http://localhost:8080/education/delete/${education_id}`
      );
      setEducationDetails([]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="myEducontainer">
          <MyProfileSidebar />
          <div className="education-details-container">
            <h1 className="education-details-title">Education Details</h1>
            <table className="education-details-table">
              <tbody>
                {Object.entries(educationDetails).map(([label, value]) => {
                  // Exclude the "Education ID" field
                  if (label === "education_id" || label === "userId") {
                    return null;
                  }

                  return (
                    <tr key={label}>
                      <td className="education-details-label">
                        {capitalizeFirstLetter(label.replace(/_/g, " "))}
                      </td>
                      <td className="education-details-value">{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {Object.keys(educationDetails).length === 0 && (
              // Display the "Add Education" button if educationDetails is empty
              <button
                className="add-education-button"
                onClick={handleAddEducation}
              >
                Add Education
              </button>
            )}
            {Object.keys(educationDetails).length > 0 && (
              <>
                {/* // Display the "Edit Education" button if educationDetails is not empty */}
                <button
                  className="add-education-button"
                  onClick={()=>handleEditEducation(educationDetails.education_id)}
                >
                  Edit Education
                </button>
                <button
                  className="deletebtn"
                  onClick={() => handleDelete(educationDetails.education_id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
          <div className="right">
            <div className="friend-requests">
              <div className="action">
                <button className="btn btn-primary" onClick={e=>{navigate('/home/education/addcourse')}}>Add Course</button>
                <button className="btn" onClick={e=>{navigate('/home/education/mycourses')}}>My Courses</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EducationDetailsPage;
