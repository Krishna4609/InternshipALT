import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditAddress() {
  // const loggedInUser = localStorage.getItem("sessionToken");
  const navigate = useNavigate();
  // const { user_id } = useParams();
  // const loggedInUserId = localStorage.getItem("sessionToken");
  const { address_id } = useParams();
  const [addressDetails, setAddressDetails] = useState({
    
    address_type: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  async function fetchAddressDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8080/address/${address_id}`
      );
      setAddressDetails(response.data);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your Spring API with the address data
      await axios.put(
        `http://localhost:8080/address/update/${address_id}`,
        addressDetails
      );

      // Clear the form after successful submission
      setAddressDetails({
        address_type: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      });
      navigate('/home/address/myaddress')
    } catch (error) {
      console.error("Error adding address data:", error);
    }
  };

  useEffect(() => {
    fetchAddressDetails();
  },[]);

  return (
    <div className="address-container">
            <h2>Update Address</h2>
        <div id='button'>
          </div>  
            
      <form>
        {/* Permanent Address Fields */}
        <div className="mb-3">
          <label className="form-label">Address Type:</label>
          <input
          type="text"
          name="address_type"
          value={addressDetails.address_type}
          onChange={handleChange}
          className="form-control"
        />
        </div>
        <div className="mb-3">
          <label className="form-label">Street Address:</label>
          <input
            type="text"
            name="street_address"
            value={addressDetails.street_address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            value={addressDetails.city}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State:</label>
          <input
            type="text"
            name="state"
            value={addressDetails.state}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code:</label>
          <input
            type="number"
            name="postal_code"
            value={addressDetails.postal_code}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            value={addressDetails.country}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        
       
        </form>
        {/* Save Button */}
      <button onClick={handleSubmit} className="btn btn-success">
        Save
      </button>
    </div>
  );}
export default EditAddress;