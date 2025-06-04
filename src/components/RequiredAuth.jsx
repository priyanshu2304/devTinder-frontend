// components/RequireAuth.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { addUser } from '../store/userSlice';

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const resp = await axios.get('/profile/view');
      dispatch(addUser(resp.data));
    } catch (error) {
      // not authenticated, do nothing here, will redirect below
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.firstName) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user?.firstName) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
