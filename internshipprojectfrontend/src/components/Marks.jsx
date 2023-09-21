import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import MyProfileSidebar from "./MyProfileSidebar";
import '../styles/marks.css'

function Marks() {
    const navigate = useNavigate()
  const { course_id } = useParams();
  const loggedUser = localStorage.getItem("sessionToken");
  const [marksData, setMarksData] = useState([]); // State to store marks data
  const [courseName, setCourseName] = useState(""); // State to store the course name

  async function fetchMarks() {
    try {
      const marksResponse = await axios.get(
        `http://localhost:8080/marks/${loggedUser}`
      );
      console.log(marksResponse.data);

      // Filter marks data based on the course_id
      const filteredMarksData = marksResponse.data.filter(
        (mark) => mark.course.course_id === parseInt(course_id)
      );

      // Get the course name from the filtered data
      if (filteredMarksData.length > 0) {
        setCourseName(filteredMarksData[0].course.courseName);
      }

      setMarksData(filteredMarksData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMarks();
  }, [course_id]);

  return (
    <>
      <Navbar />
      <main>
        <div className="myMarksContainer">
          <MyProfileSidebar />
          <div className="marks-container">
            <h1>Marks for Course: {courseName}</h1>
            <table>
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Subject Name</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {marksData.map((mark) => (
                  <tr key={mark.id}>
                    <td>{mark.semester.sem}</td>
                    <td>{mark.subject.subjectName}</td>
                    <td>{mark.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn-btn-primary" onClick={e=>{navigate('/home/education/mycourses')}}>Back</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Marks;
