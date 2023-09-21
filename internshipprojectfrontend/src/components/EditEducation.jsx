import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEducation() {
  const loggedInUser = localStorage.getItem("sessionToken");
  const navigate = useNavigate();
  const { education_id } = useParams();
  const [educationDetails, setEducationDetails] = useState({
    userId: loggedInUser, // Assuming you have a user ID for the education record
    tenth_schoolname: "",
    tenth_school_city: "",
    tenth_pass_year: "",
    college_name: "",
    college_city: "",
    twelth_pass_year: "",
    degree: "",
    degree_collegename: "",
    degree_collegeplace: "",
    university_name: "",
    branch: "",
    current_year: "",
    cgpa: "",
    graduation_year: "",
  });

  async function fetchEducationDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8080/education/educationByUserId/${loggedInUser}`
      );
      setEducationDetails(response.data);
    } catch (error) {
      console.error("Error fetching education data:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails({
      ...educationDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your Spring API with the education data
      const res = await axios.put(
        `http://localhost:8080/education/update/${education_id}`,
        educationDetails
      );

      // Clear the form after successful submission
      setEducationDetails({
        userId: loggedInUser, // Reset user ID
        tenth_schoolname: "",
        tenth_school_city: "",
        tenth_pass_year: "",
        college_name: "",
        college_city: "",
        twelth_pass_year: "",
        degree: "",
        degree_collegename: "",
        degree_collegeplace: "",
        university_name: "",
        branch: "",
        current_year: "",
        cgpa: "",
        graduation_year: "",
      });
      navigate("/home/education");
    } catch (error) {
      console.error("Error adding education data:", error);
    }
  };

  useEffect(() => {
    fetchEducationDetails();
  },[]);

  return (
    <div className="education-page">
      <div>
        <h3>Add Education</h3>
        <form onSubmit={handleSubmit}>
          <h3>Tenth details</h3>
          <div>
            <label htmlFor="tenth_schoolname">10th School Name:</label>
            <input
              type="text"
              id="tenth_schoolname"
              name="tenth_schoolname"
              value={educationDetails.tenth_schoolname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tenth_school_city">10th School City:</label>
            <input
              type="text"
              id="tenth_school_city"
              name="tenth_school_city"
              value={educationDetails.tenth_school_city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tenth_pass_year">10th Pass Year:</label>
            <input
              type="int"
              id="tenth_pass_year"
              name="tenth_pass_year"
              value={educationDetails.tenth_pass_year}
              onChange={handleChange}
              required
            />
          </div>
          <h3>Twelth details</h3>
          <div>
            <label htmlFor="college_name">College Name:</label>
            <input
              type="text"
              id="college_name"
              name="college_name"
              value={educationDetails.college_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="college_city">College City:</label>
            <input
              type="text"
              id="college_city"
              name="college_city"
              value={educationDetails.college_city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="twelth_pass_year">12th Pass Year:</label>
            <input
              type="int"
              id="twelth_pass_year"
              name="twelth_pass_year"
              value={educationDetails.twelth_pass_year}
              onChange={handleChange}
              required
            />
          </div>
          <h3>Degree details</h3>
          <div>
            <label htmlFor="degree">Degree:</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={educationDetails.degree}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="degree_collegename">Degree College Name:</label>
            <input
              type="text"
              id="degree_collegename"
              name="degree_collegename"
              value={educationDetails.degree_collegename}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="degree_collegeplace">Degree College Place:</label>
            <input
              type="text"
              id="degree_collegeplace"
              name="degree_collegeplace"
              value={educationDetails.degree_collegeplace}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="university_name">University Name:</label>
            <input
              type="text"
              id="university_name"
              name="university_name"
              value={educationDetails.university_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="branch">Branch:</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={educationDetails.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="current_year">Current Year:</label>
            <input
              type="int"
              id="current_year"
              name="current_year"
              value={educationDetails.current_year}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cgpa">CGPA:</label>
            <input
              type="int"
              id="cgpa"
              name="cgpa"
              step="0.01"
              value={educationDetails.cgpa}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="graduation_year">Graduation Year:</label>
            <input
              type="int"
              id="graduation_year"
              name="graduation_year"
              value={educationDetails.graduation_year}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Save Education</button>
        </form>
      </div>
    </div>
  );
}

export default EditEducation;
