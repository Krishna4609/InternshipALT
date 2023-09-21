import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import MyProfileSidebar from "./MyProfileSidebar";
import "../styles/mycourse.css";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("sessionToken");
  const [courses, setCourses] = useState([]); // State to store courses

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const courseResponse = await axios.get(
        `http://localhost:8080/course/getCourse/${loggedUser}`
      );
      console.log(courseResponse.data);
      setCourses(courseResponse.data); // Set the courses in state
    } catch (error) {
      console.log(error);
    }
  }

  const handleView = (course_id) => {
    navigate(`/home/education/mycourses/${course_id}/marks`);
  };
  return (
    <>
      <Navbar />
      <main>
        <div className="myCourseContainer">
          <MyProfileSidebar />
          <div className="course-container">
            <h1>My Courses</h1>
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.course_id}>
                    <td>{course.courseName}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleView(course.course_id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyCourses;
