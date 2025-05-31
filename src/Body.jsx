import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import axios from '../src/utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { addUser } from './store/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const resp = await axios.get('/profile/view');
      dispatch(addUser(resp.data));
    } catch (error) {
      navigate('/login');
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.firstName) return;
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
