import React, { useState } from 'react';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'priyanshumodi@gmail.com',
    password: 'Priyanshu@98',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e, inputType) => {
    e.preventDefault();
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [inputType]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const emailValid = validator.isEmail(formData.email);
      const passwordValid = formData.password.length >= 6;

      if (!emailValid || !passwordValid) {
        setErrors({
          email: emailValid ? '' : 'Invalid email address',
          password: passwordValid
            ? ''
            : 'Password must be at least 6 characters',
        });
        return;
      }

      // Adjust path as needed

      const res = await axios.post('/login', formData);

      dispatch(addUser(res.data));
      return navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        noValidate
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange(e, 'email')}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email}</span>
        )}
        <label className="label mt-4">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="input w-full pr-10"
            placeholder="Password"
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
          <span className="text-sm text-red-500">{errors.password}</span>
        )}

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
