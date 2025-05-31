import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/userSlice';
import { Navigate } from 'react-router-dom';

const PrivateLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const resp = await axios.get('/profile/view');
      dispatch(addUser(resp.data));
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.firstName) return;
    fetchUser();
  }, []);
  return (
    <div>
      {user?.firstName ? (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateLayout;
