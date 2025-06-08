import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/userSlice';

const PrivateLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const hideFooter = location.pathname.startsWith('/chat');

  return (
    <div>
      {user?.firstName ? (
        <>
          <NavBar />
          <Outlet />
          {!hideFooter && <Footer />}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default PrivateLayout;
