import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from '../utils/axiosInstance';
import { addUser } from '../store/userSlice';

const PublicLayout = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  const fetchUser = async () => {
    try {
      const resp = await axios.get('/profile/view');
      dispatch(addUser(resp.data));
    } catch (error) {
      // user not logged in — ignore
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user?.firstName && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[90vh]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
