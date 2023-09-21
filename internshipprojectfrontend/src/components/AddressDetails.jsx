import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/address-details.css";
import MyProfileSidebar from "./MyProfileSidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function AddressDetails() {
  const navigate = useNavigate();
  const [addressDetails, setAddressDetails] = useState([]);
  const loggedInUserId = localStorage.getItem("sessionToken");

  useEffect(() => {
    async function fetchAddressDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/address/getAddress/${loggedInUserId}`
        );
        setAddressDetails(response.data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    }

    if (loggedInUserId) {
      fetchAddressDetails();
    }
  }, [loggedInUserId]);

  const handleEditAddress = (address_id) => {
    navigate(`/home/address/update/${address_id}`);
  };

  const handleDelete = async (address_id) => {
    try {
      await axios.delete(`http://localhost:8080/address/delete/${address_id}`);
      setAddressDetails((prevAddress) =>
        prevAddress.filter((address) => address.address_id !== address_id)
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="myAddcontainer">
          <MyProfileSidebar />
          <div className="address-details-container">
            <h1 className="address-details-title">Address Details</h1>
            <table className="address-details-table">
              <tbody>
                {addressDetails.map((address) => (
                  <>
                    <tr key={address.address_id}>
                      <td className="label">Address Type</td>
                      <td>{address.address_type}</td>
                    </tr>
                    <tr key={address.street_address}>
                      <td className="label">Street Address</td>
                      <td>{address.street_address}</td>
                    </tr>
                    <tr key={address.city}>
                      <td className="label">City</td>
                      <td>{address.city}</td>
                    </tr>
                    <tr key={address.state}>
                      <td className="label">State</td>
                      <td>{address.state}</td>
                    </tr>
                    <tr key={address.postal_code}>
                      <td className="label">Postal Code</td>
                      <td>{address.postal_code}</td>
                    </tr>
                    <tr key={address.country}>
                      <td className="label">Country</td>
                      <td>{address.country}</td>
                    </tr>
                    <tr key={`actions-${address.address_id}`}>
                      <td colSpan="2">
                        <button
                          className="add-address-button"
                          onClick={() => handleEditAddress(address.address_id)}
                        >
                          Edit Address
                        </button>
                        <button
                          className="deletebtn"
                          onClick={() => handleDelete(address.address_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            {addressDetails.length === 0 ? (
              <button
                className="add-address-button"
                onClick={() => {
                  navigate("/home/address/addaddress");
                }}
              >
                Add Address
              </button>
            ) : (
              <button
                className="add-address-button"
                onClick={() => {
                  navigate("/home/address/addAdditionalAddress");
                }}
              >
                Add Additional Address
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AddressDetails;