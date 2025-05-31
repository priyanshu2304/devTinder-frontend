import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicLayout = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      {user?.firstName ? (
        <Navigate to="/" />
      ) : (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default PublicLayout;
