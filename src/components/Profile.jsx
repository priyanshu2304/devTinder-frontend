import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import axios from '../utils/axiosInstance';
import { addUser } from '../store/userSlice';

const defaultUser = {
  firstName: '',
  lastName: '',
  age: 18,
  about: '',
  photoUrl: '',
  gender: 'Male',
};

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ...defaultUser,
    ...user,
  });
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const includedFields = [
        'firstName',
        'lastName',
        'age',
        'gender',
        'photoUrl',
        'about',
      ];

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => includedFields.includes(key))
      );

      const res = await axios.patch('/profile/edit', filteredData);
      dispatch(addUser(res.data));
      setError('');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-4 my-10">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        onSubmit={handleSubmit}
      >
        <legend className="fieldset-legend">Edit Profile</legend>
        <label className="label">First Name:</label>
        <input
          name="firstName"
          type="text"
          className="input"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label className="label">Last Name:</label>
        <input
          name="lastName"
          type="text"
          className="input"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label className="label">Age</label>
        <input
          type="text"
          name="age"
          className="input"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
        />

        <label className="label">Gender</label>
        <select
          name="gender"
          className="select select-bordered w-full"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="label">Photo URL</label>
        <input
          type="text"
          name="photoUrl"
          className="input"
          placeholder="Your Photo URL"
          value={formData.photoUrl}
          onChange={handleChange}
        />
        <label className="label">About</label>
        <textarea
          cols={2}
          type="text"
          name="about"
          className="input"
          placeholder="About"
          value={formData.about}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-neutral my-4">
          Submit
        </button>

        {showToast && (
          <div className="toast toast-end">
            <div className="alert alert-success">
              <span>Profile saved Successfully</span>
            </div>
          </div>
        )}
        {error && (
          <div className="toast toast-end">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        )}
      </form>
      <UserCard user={formData} />
    </div>
  );
};

export default Profile;
