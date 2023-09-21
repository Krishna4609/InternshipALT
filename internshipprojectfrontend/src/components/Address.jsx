import React, { useState, useEffect } from "react";

import "../styles/Address.css"; // Import your custom CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();

  const loggedUser = localStorage.getItem("sessionToken");
  const [permanentAddress, setPermanentAddress] = useState({
    address_type: "permanent_address",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const [currentAddress, setCurrentAddress] = useState({
    address_type: "current_address",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const [permanentErrors, setPermanentErrors] = useState({
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const [currentErrors, setCurrentErrors] = useState({
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const [isSameAddress, setIsSameAddress] = useState(false);

  const handlePermanentAddressChange = (e) => {
    const { name, value } = e.target;
    setPermanentAddress({ ...permanentAddress, [name]: value });
  };

  const handleCurrentAddressChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);
  };
  useEffect(() => {
    if (isSameAddress) {
      const { address_type, ...restOfPermanentAddress } = permanentAddress;
      setCurrentAddress({
        ...restOfPermanentAddress,
      });
    } else {
      // Clear currentAddress fields when checkbox is unchecked
      setCurrentAddress({
        address_type: "",
        street_address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      });
    }
  }, [isSameAddress, permanentAddress]);

  const handleSaveClick = async (e) => {
    e.preventDefault();

    // Validate Permanent Address
    const permanentErrorsCopy = { ...permanentErrors };
    let permanentValid = true;

    if (!permanentAddress.street_address.trim()) {
      permanentErrorsCopy.street_address = "Street Address is required";
      permanentValid = false;
    }

    if (!permanentAddress.city.trim()) {
      permanentErrorsCopy.city = "City is required";
      permanentValid = false;
    }

    if (!permanentAddress.state.trim()) {
      permanentErrorsCopy.state = "State is required";
      permanentValid = false;
    }

    if (!permanentAddress.postal_code.trim()) {
      permanentErrorsCopy.postal_code = "Postal Code is required";
      permanentValid = false;
    }

    if (!permanentAddress.country.trim()) {
      permanentErrorsCopy.country = "Country is required";
      permanentValid = false;
    }

    setPermanentErrors(permanentErrorsCopy);

    // Validate Current Address
    const currentErrorsCopy = { ...currentErrors };
    let currentValid = true;

    if (!currentAddress.street_address.trim()) {
      currentErrorsCopy.street_address = "Street Address is required";
      currentValid = false;
    }

    if (!currentAddress.city.trim()) {
      currentErrorsCopy.city = "City is required";
      currentValid = false;
    }

    if (!currentAddress.state.trim()) {
      currentErrorsCopy.state = "State is required";
      currentValid = false;
    }

    if (!currentAddress.postal_code.trim()) {
      currentErrorsCopy.postal_code = "Postal Code is required";
      currentValid = false;
    }

    if (!currentAddress.country.trim()) {
      currentErrorsCopy.country = "Country is required";
      currentValid = false;
    }

    setCurrentErrors(currentErrorsCopy);

    // Check if both addresses are valid
    if (!permanentValid || !currentValid) {
      return; // Prevent form submission if there are errors
    }

    try {
      // Send a POST request to your Spring API with the addresses data
      await axios.post(
        `http://localhost:8080/address/${loggedUser}/addAddress`,
        permanentAddress
      );
      await axios.post(
        `http://localhost:8080/address/${loggedUser}/addAddress`,
        currentAddress
      );
      navigate("/home/address");
    } catch (error) {
      alert("Failed to save addresses");
      console.error("Error saving addresses:", error);
    }
  };


  return (
    <div className="address-container">
      <h2>Permanent Address</h2>
      <div id="button"></div>

      <form>
        {/* Permanent Address Fields */}

        <div className="mb-3">
          <label className="form-label">Street Address:</label>
          <input
            type="text"
            name="street_address"
            value={permanentAddress.street_address}
            onChange={handlePermanentAddressChange}
            className="form-control"
          /> <div className="error">{permanentErrors.street_address}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            value={permanentAddress.city}
            onChange={handlePermanentAddressChange}
            className="form-control"
          />  <div className="error">{permanentErrors.city}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">State:</label>
          <input
            type="text"
            name="state"
            value={permanentAddress.state}
            onChange={handlePermanentAddressChange}
            className="form-control"
          /> <div className="error">{permanentErrors.state}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code:</label>
          <input
            type="number"
            name="postal_code"
            value={permanentAddress.postal_code}
            onChange={handlePermanentAddressChange}
            className="form-control"
          /> <div className="error">{permanentErrors.postal_code}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            value={permanentAddress.country}
            onChange={handlePermanentAddressChange}
            className="form-control"
          /> <div className="error">{permanentErrors.country}</div>
        </div>

        {/* Checkbox for Same Address */}
        <div className="checkbox">
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isSameAddress}
              onChange={handleCheckboxChange}
              id="sameAddressCheckbox"
            />
            <label className="form-check-label" htmlFor="sameAddressCheckbox">
              Is Current Address the Same as Permanent Address?
            </label>
          </div>
        </div>

        {/* Current Address Fields */}
        <h2>Current Address</h2>

        <div className="mb-3">
          <label className="form-label">Street Address:</label>
          <input
            type="text"
            name="street_address"
            value={currentAddress.street_address}
            onChange={handleCurrentAddressChange}
            className="form-control"
            disabled={isSameAddress}
          /> <div className="error">{currentErrors.street_address}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            value={currentAddress.city}
            onChange={handleCurrentAddressChange}
            className="form-control"
            disabled={isSameAddress}
          />  <div className="error">{currentErrors.city}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">State:</label>
          <input
            type="text"
            name="state"
            value={currentAddress.state}
            onChange={handleCurrentAddressChange}
            className="form-control"
            disabled={isSameAddress}
          /> <div className="error">{currentErrors.state}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code:</label>
          <input
            type="number"
            name="postal_code"
            value={currentAddress.postal_code}
            onChange={handleCurrentAddressChange}
            className="form-control"
            disabled={isSameAddress}
          /> <div className="error">{currentErrors.postal_code}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            value={currentAddress.country}
            onChange={handleCurrentAddressChange}
            className="form-control"
            disabled={isSameAddress}
          /> <div className="error">{currentErrors.country}</div>
        </div>
      </form>
      {/* Save Button */}
      <button onClick={handleSaveClick} className="btn btn-success">
        Save
      </button>
    </div>
  );
}

export default Address;