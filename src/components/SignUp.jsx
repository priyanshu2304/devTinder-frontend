import React, { useState } from 'react';
import validator from 'validator';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    skills: [],
    photoUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const skillOptions = ['Cricket', 'Football', 'Coding'];

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSkillChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setFormData((prev) => ({ ...prev, skills: selected }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!validator.isEmail(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 6)
      newErrors.password = 'Minimum 6 characters';
    if (!formData.gender) newErrors.gender = 'Select a gender';
    if (formData.skills.length === 0)
      newErrors.skills = 'Select at least one skill';
    if (!validator.isURL(formData.photoUrl))
      newErrors.photoUrl = 'Invalid image URL';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('/signup', formData);
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (err) {
      setErrors({ apiError: err?.response?.data || 'Signup failed' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300 p-6 rounded-box w-full max-w-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* First Name */}
        <label className="label">First Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.firstName}
          onChange={(e) => handleChange(e, 'firstName')}
        />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName}</p>
        )}

        {/* Last Name */}
        <label className="label mt-3">Last Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.lastName}
          onChange={(e) => handleChange(e, 'lastName')}
        />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName}</p>
        )}

        {/* Email */}
        <label className="label mt-3">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={(e) => handleChange(e, 'email')}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        {/* Password */}
        <label className="label mt-3">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="input input-bordered w-full pr-10"
            value={formData.password}
            onChange={(e) => handleChange(e, 'password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}

        {/* Gender */}
        <label className="label mt-3">Gender</label>
        <div className="flex gap-4">
          {['male', 'female', 'other'].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={option}
                checked={formData.gender === option}
                onChange={(e) => handleChange(e, 'gender')}
                className="radio radio-sm"
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender}</p>
        )}

        {/* Skills */}
        <label className="label mt-3">Skills</label>
        <select
          multiple
          className="select select-bordered w-full"
          value={formData.skills}
          onChange={handleSkillChange}
        >
          {skillOptions.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        {errors.skills && (
          <p className="text-sm text-red-500">{errors.skills}</p>
        )}

        {/* Photo URL */}
        <label className="label mt-3">Profile Photo URL</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="https://..."
          value={formData.photoUrl}
          onChange={(e) => handleChange(e, 'photoUrl')}
        />
        {errors.photoUrl && (
          <p className="text-sm text-red-500">{errors.photoUrl}</p>
        )}

        {/* API Error */}
        {errors.apiError && (
          <p className="text-sm text-red-500 mt-3">{errors.apiError}</p>
        )}

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-6">
          Sign Up
        </button>

        {/* Redirect */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <span
            className="link text-primary cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
