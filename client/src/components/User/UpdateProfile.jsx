import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./userStyles.css";

const UpdateProfile = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    address: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserData({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          birthday: res.data.birthday ? res.data.birthday.slice(0, 10) : "",
          address: res.data.address || "",
        });

        if (res.data.avatar) {
          setPreview(`http://localhost:5000/api/uploads/${res.data.avatar}`);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Update Your Profile</h2>

      {preview && (
        <img src={preview} alt="Avatar Preview" className="avatar-preview" />
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="date"
          name="birthday"
          value={userData.birthday}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit">Save Changes</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdateProfile;
