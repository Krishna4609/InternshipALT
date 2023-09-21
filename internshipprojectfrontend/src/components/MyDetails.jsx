import axios from "axios";
import { useEffect, useState } from "react"; // Import useEffect and useState
import MyProfileSidebar from "./MyProfileSidebar";
import Navbar from "./Navbar";
import "../styles/mydetails.css";

function MyDetails() {
  const loggedUser = localStorage.getItem("sessionToken");
  const [userData, setUserData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchUserDetails();
    fetchEducationDetails();
    fetchSkillDetails();
  }, []);

  // async function handleUploadProfilePic(e) {
  //   e.preventDefault()
  //   try {
  //     const res = axios.post(
  //       `http://localhost:8080/users/uploadPic/${loggedUser}`,
  //       { picture: content }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function fetchUserDetails() {
    try {
      const userResponse = await axios.get(
        `http://localhost:8080/users/${loggedUser}/getUser`
      );
      setUserData(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEducationDetails() {
    try {
      const educationResponse = await axios.get(
        `http://localhost:8080/education/educationByUserId/${loggedUser}`
      );

      setEducationData(educationResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSkillDetails() {
    try {
      const skillResponse = await axios.get(
        `http://localhost:8080/skill/${loggedUser}/getSkill`
      );

      setSkillData(skillResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="myDetailsContainer">
          <MyProfileSidebar />
          <div className="details-container">
            <h2>User Details</h2>
            <table>
              <tbody>
                {Object.entries(userData).map(([key, value]) => {
                  if (
                    key === "user_id" ||
                    key === "password" ||
                    key === "addresses" ||
                    key === "courses" ||
                    key === "marks" ||
                    key === "picture"
                  ) {
                    return null;
                  }
                  return (
                    <tr key={key}>
                      <td className="label">{capitalizeFirstLetter(key)}</td>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <form action="" onSubmit={handleUploadProfilePic}>
              <label htmlFor="profilepic">Add a Profile Pic: </label>
              <input
                type="file"
                className="image-input"
                onChange={(e) => setContent(e.target.files[0])}
              />
              <input type="submit" value="Upload" />
            </form> */}
            <h2>Education Details</h2>
            {Object.entries(educationData).length > 0 ? (
              <table>
                <tbody>
                  {Object.entries(educationData).map(([key, value]) => {
                    if (key === "userId" || key === "education_id") {
                      return null;
                    }
                    return (
                      <tr key={key}>
                        <td className="label">{capitalizeFirstLetter(key)}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No education data available.</p>
            )}

            <h2>Skill Details</h2>
            {skillData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Skill </th>
                    <th>Skill Name</th>
                    <th>Proficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {skillData.map((skill) => (
                    <tr key={skill.skill_id}>
                      <td>{skill.skillType}</td>
                      <td>{skill.skillName}</td>
                      <td>{skill.proficiency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No skill data available.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MyDetails;
