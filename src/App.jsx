import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Body from './Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>Sign Up</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
