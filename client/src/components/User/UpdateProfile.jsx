import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import "./userStyles.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { user, isLoading, error, updateMessage } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    address: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        birthday: user.birthday ? user.birthday.slice(0, 10) : "",
        address: user.address || "",
      });
      setPreview(
        user.avatar ? `http://localhost:5001/api/uploads/${user.avatar}` : null
      );
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (avatarFile) {
      data.append("avatar", avatarFile);
    }

    dispatch(updateUser({ userId, formData: data }));
  };

  return (
    <div className="profile-form">
      <h2>Update Your Profile</h2>

      {preview && (
        <img src={preview} alt="Avatar Preview" className="avatar-preview" />
      )}

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleInputChange}
        />

        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleInputChange}
        />

        <button type="submit" disabled={isLoading}>
          Save Changes
        </button>
      </form>

      {updateMessage && <p>{updateMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateProfile;
