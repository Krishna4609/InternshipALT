import React, { useState, useEffect } from "react";
import "../styles/Address.css"; // Import your custom CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdditionalAddress = ({ userId }) => {

  const navigate = useNavigate()
  const loggedUser = localStorage.getItem("sessionToken");
  const [newAddress, setNewAddress] = useState({
    address_type: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    address_type: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const saveAdditionalAddress = async (e) => {
    e.preventDefault();

    // Validate each field
    let isValid = true;
    const newErrors = { ...errors };

    if (!newAddress.address_type.trim()) {
      newErrors.address_type = "Address Type is required";
      isValid = false;
    } else {
      newErrors.address_type = "";
    }

    if (!newAddress.street_address.trim()) {
      newErrors.street_address = "Street Address is required";
      isValid = false;
    } else {
      newErrors.street_address = "";
    }

    if (!newAddress.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    } else {
      newErrors.city = "";
    }

    if (!newAddress.state.trim()) {
      newErrors.state = "State is required";
      isValid = false;
    } else {
      newErrors.state = "";
    }

    if (!newAddress.postal_code.trim()) {
      newErrors.postal_code = "Postal Code is required";
      isValid = false;
    } else {
      newErrors.postal_code = "";
    }

    if (!newAddress.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    } else {
      newErrors.country = "";
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    try {
      const addressesToSave = {
        newAddress, // Set your default value here
      };

      // Send a POST request to your Spring API with the addresses data
      await axios.post(
        `http://localhost:8080/address/${loggedUser}/addAddress`,
        addressesToSave.newAddress
      );

      // Clear the form after successful submission
      setNewAddress({
        address_type: "",
        street_address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      });
      navigate("/home/address/myaddress");
    } catch (error) {
      alert("Failed to save addresses");
      console.error("Error saving addresses:", error);
    }
  };

  return (


    
    <div className="address-container">
      <h2>Add Additional Address</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Address Type:</label>
          <input
            type="text"
            className="form-control"
            name="additionalAddressType"
            value={newAddress.address_type}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                address_type: e.target.value,
              })
            } required
            
          />
        <div className="error">{errors.address_type}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Street Address:</label>
          <input
            type="text"
            className="form-control"
            name="additionalStreetAddress"
            value={newAddress.street_address}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                street_address: e.target.value,
              })
            }required
          /> <div className="error">{errors.street_address}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            name="additionalCity"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }required
          /> <div className="error">{errors.city}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            name="additionalState"
            value={newAddress.state}
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }required
          /> <div className="error">{errors.state}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code:</label>
          <input
            type="text"
            className="form-control"
            name="additionalPostalCode"
            value={newAddress.postal_code}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                postal_code: e.target.value,
              })
            }required
          /> <div className="error">{errors.postal_code}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            className="form-control"
            name="additionalCountry"
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                country: e.target.value,
              })
            } required
          /> <div className="error">{errors.country}</div>
        </div>
      </form>
      <button className="btn btn-primary" onClick={saveAdditionalAddress}>
        Save  Address
      </button>
    </div>
  );
};

export default AdditionalAddress;